const { capitalize, attrGetterSetter, pending, diffObjectChanges } = require('./utils'),
      { Base } = require('./base'),
      { Card } = require('./card'),
      { Player } = require('./player'),
      { Permission } = require('./permission'),
      { Deck } = require('./deck'),
      { DataStore } = require('./data-store');

global.capitalize = capitalize;
var gameIDCounter = 1;

class Game extends Base {
  constructor(_opts) {
    super();

    const defineStoreAttr = (name, prefix = '') => {
      attrGetterSetter(this, name,
        () => _store.op(({ state, selectors }) => selectors[`get${capitalize(name)}`](state)),
        (val) => {
          _store.op(({ dispatch, actions }) => {
            var action = `set${prefix}${capitalize(name)}`;
            console.log('SETTING WITH ACTION: ', action);
            dispatch(actions[action](val));
          });

          return val;
        }, 
        true
      );
    };

    var opts = _opts || {},
        _renderer = null,
        _server = (typeof window === 'undefined'),
        _connection = opts.connection || null,
        _store = new DataStore(this);

    _store.subscribe(this.onStoreUpdated.bind(this));
    attrGetterSetter(this, 'store', () => _store, () => {});

    attrGetterSetter(this, 'isServer', () => _server, () => {});

    attrGetterSetter(this, 'renderer', () => _renderer, (val) => {
      _renderer = val;
      return val;
    });

    attrGetterSetter(this, 'connection', () => _connection, (val) => {
      _connection = (_server) ? val : this.initializeConnection(val);
      return val;
    });

    this.id = opts.id || (gameIDCounter++);

    defineStoreAttr('players');
    defineStoreAttr('cards');
    defineStoreAttr('permissions');

    this.players = (opts.players || []).map((player) => this.instantiateClassByName(player._class, [player]));
    this.cards = (opts.cards || []).map((card) => this.instantiateClassByName(card._class, [card]));
    this.permissions = (opts.permissions || []).map((permission) => this.instantiateClassByName(card._class, [permission]));


    ['currentPlayerID',
    'clientPlayerID',
    'defaultCardWidth',
    'defaultCardHeight',
    'defaultHandWidth',
    'cardBackgroundImageURL'].forEach((propName)=>{
      defineStoreAttr(propName, 'Game');
      if(opts.hasOwnProperty(propName))
        this[propName] = opts[propName];

    });
  }

  destroy(){
    if(this.renderer){
      this.renderer.destroy();
      this.renderer = null;
    }
    this.store.destroy();
  }

  async serverUpdate(newState, oldState) {
    var diffs = diffObjectChanges(oldState,newState);
    diffs.forEach((diff)=>{
      var key = diff.key,
          a = diff.aValue,
          b = diff.bValue;

      if (key.match(/^cards\./)) {
        this.sendStoreUpdate({action: 'updateCards', value: (!b && a && a.data) ? { id: a.data.id } : (b || {}).data, reset: !b });
      } else if (key.match(/^players\./)) {
        this.sendStoreUpdate({action: 'updatePlayers', value: (!b && a && a.data) ? { id: a.data.id } : (b || {}).data, reset: !b });
      } else if (key.match(/^permissions\./)) {
        this.sendStoreUpdate({action: 'updatePermissions', value: (!b && a && a.data) ? { id: a.data.id } : (b || {}).data, reset: !b });
      } else if (key.match(/^game\./)) {

        var actionName = key.replace(/^game.(\w+)/, function(m, capture1) {
          return 'updateGame' + capture1.charAt(0).toUpperCase() + capture1.substring(1);
        })
        this.sendStoreUpdate({action: actionName, value: b});

      } 
    });
  }

  async clientUpdate(newState, oldState) {
    await this.render();
  }

  onStoreUpdated(newState, oldState) {
    console.log('STORE UPDATED!!!', newState, oldState);

    if (this.isServer)
      this.serverUpdate(newState, oldState);
    else
      this.clientUpdate(newState, oldState);
  }

  instantiateClassByName(className, args) {
    if (className === 'Card')
      return new Card(this, ...args);
    else if (className === 'Permission')
      return new Permission(this, ...args);
    else if (className === 'Player')
      return new Player(this, ...args);
    else if (className === 'Deck')
      return new Deck(this, ...args);

  }

  setRenderer(renderer) {
    this.renderer = renderer;
    return this;
  }

  setConnection(connection) {
    this.connection = connection;
    return this;
  }

  sendStoreUpdate(data){
    this.connection.emit('storeUpdate', data);
  };

  initializeConnection(connection) {
    if (this.connection)
      this.connection.disconnect();

    if (!connection)
      return;

    this.sendChat = (user, message) => {
      if (typeof message !== 'string')
        throw new Error('Improper usage. Specify your username as the first argument, message as the second');

      connection.emit('chat_message', {
        user,
        message
      });
    };

    this.emitAction = (action) => {
      connection.emit('action', action);

    };

    connection.on('storeUpdate', (data) => {
      this.store.op(({dispatch, actions}) => {
        if(!actions.hasOwnProperty(data.action))
          return
        dispatch(actions[data.action](data.value, data.reset));
      });
    });

    connection.on('chat_message', (data) => {
      console.info(`${data.user} says: ${data.message}`);
    });

    connection.on('disconnect', () => {
      console.info('Client disconnected');
    });

    return connection;
  }

  // Players
  addPlayer(data) {
    var player = new Player(this, data);

    this.store.op(({ dispatch, actions }) => {
      dispatch(actions.updatePlayers([player]));
    });

    if (this.players.length === 1)
      this.setPlayerTurn(player);

    return player;
  }

  removePlayer(player) {
    var playerCards = this.store.op(({ state, selectors }) => selectors.getCardsByOwner(state, player));

    this.store.op(({ dispatch, actions }) => {
      dispatch(actions.updateCards(playerCards, true));
      dispatch(actions.updatePlayers(player, true));
    });
  }

  clearPlayers() {
    this.store.op(({ dispatch, actions }) => {
      dispatch(actions.setPlayers([]));
    });
  }

  numberOfPlayers() {
    return this.players.length;
  }

  setPlayerTurn(player) {
    if (!player)
      return;

    this.currentPlayerID = player.id;
  }

  getPlayerByID(id) {
    return this.store.op(({ state, selectors}) => selectors.getPlayer(state, id));
  }

  getCurrentPlayerID() {
    return this.currentPlayerID;
  }

  getCurrentPlayer() {
    return this.getPlayerByID(this.getCurrentPlayerID());
  }

  getClientPlayerID() {
    return this.clientPlayerID;
  }

  getClientPlayer() {
    return this.getPlayerByID(this.getClientPlayerID());
  }

  // Cards
  addCard(data) {
    var card = new Card(this, data);

    // Add card to store
    this.store.op(({ dispatch, actions }) => {
      dispatch(actions.updateCards([card]));
    });

    return card;
  }

  removeCard(card) {
    // Remove card from store
    this.store.op(({ dispatch, actions }) => {
      dispatch(actions.updateCards([card], true));
    });
  }

  clearCards() {
    this.store.op(({ dispatch, actions }) => {
      dispatch(actions.setCards([]));
    });
  }

  // generateDeck() {
  //   // variable "cards" equals an empty array
  //   var cards = [];

  //   // variable "suits" equals the suits defined in the const SUITS
  //   var suits = Card.CARDS;

  //   // return all the keys of the suits object
  //   var suitkeys = Object.keys(suits);

  //   // if index is less than suites length, iterate (4 suites)
  //   for(var x = 0; x < 4; x++) {

  //     // if index is less than values length (13 values)
  //     for(var i = 0; i < suitkeys.length; i++) {
  //       // each key in suits =
  //       var suitkey = suitkeys[i];

  //       // access value in var suitkey
  //       var suitvalue = suits[suitkey];

  //       // create a "card" object and give it a value and a suit
  //       var card = new Card(this, { value: suitkey, suit: Card.SUITS[x] });

  //       // give the object "cards" the key "card" that stores a "value" and "suit" key
  //       cards.push(card);
  //     }
  //   }

  //   return cards.slice(0, 2);
  // }

  // getRandomCardFromDeck() {
  //   var unassignedCards = this.getUnassignedCards();
  //   return unassignedCards[Math.floor(Math.random() * unassignedCards.length)];
  // }

  createRandomCard() {
    // use math to randomly generate a suit - get random index
    var suits = Card.SUITS;
    var randomSuit = suits[Math.floor(Math.random() * suits.length)];

    // use math to randomly generate a value - get random key from object
    var values = Object.keys(Card.CARDS);
    var randomValue = values[Math.floor(Math.random() * values.length)];

    // combine results and turn into card
    return new Card(this, { value: randomValue, suit: randomSuit });
  }

  addRandomCardToHand(player) {
    if(!player)
      return;

    var card = this.createRandomCard();

    // assign that card to the current player
    this.assignCardToOwner(player, card);

    // add that card to the current cards
    this.addCard(card);

    console.log(`Gave ${card} to ${player}`);

    return card;
  }

  assignCardToOwner(owner, card) {
    // Change the card owner
    card.setOwner(owner);

    // Make sure to update the store
    this.addCard(card);
  }

  getCardsMatchingOwnerID(id) {
    return this.store.op(({ state, selectors }) => selectors.getCardsByOwner(state, id));
  }

  getCardOwnersHand(player) {
    return this.getCardsMatchingOwnerID(player.id);
  }

  getUnassignedCards() {
    return this.getCardsMatchingOwnerID(0);
  }

  update() {

  }

  async render() {
    var R = this.renderer;
    if (!R)
      return;

    R.querySelectorAll('[data-action]').forEach((element) => {
      element.addEventListener('click', (event) => {
        var game = this,
            player = this.getClientPlayer(),
            cardElement = element.closest('[data-card-id]'),
            card,
            actionName = element.getAttribute('data-action');

        if (cardElement)
          card = this.getCardByID(cardElement.getAttribute('data-card-id'));

        console.log('I WAS CLICKED!!!', event, game, player, card);
        if (typeof this.emitAction === 'function') {
          this.emitAction({
            name: actionName,
            cardID: (card) ? card.id : undefined,
            playerID: (player) ? player.id : undefined,
            gameID: game.id
          });
        }
      }, false);
    });
  }

  calculateGameState() {

  }

  recieveAction(action) {
    if (!this.isServer)
      return;

    var actionName = 'action' + capitalize(action.name);
    //actionHit
    if (typeof this[actionName] !== 'function')
      return;

    if (this.checkPlayIsValid(action)) {
      return this[actionName](action);
    } else {
      return false;
    }
  }
}

/*
what a game needs.
1. needs players
  1a. needs to have a definable count of players
  1b. if there is <= 2 players break
  1c. default extra players will be cpu
  1d. needs to interact with players, holding informtion about instanciated self
2. need players cards.
  1a. a players cards should belong to a player
  1b. if a player has cards make cards viewable
  1c. determin the total value of those cards
3. define a turn
  1a. possibly define a turn which begins at x (does not matter)
  1b. turns can count to infinity
  1c. when turn loop runs more turn method to mext players
*/

module.exports = {
  Game
};