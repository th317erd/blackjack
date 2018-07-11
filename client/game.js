const { Card } = require('./card'),
      { capitalize } = require('./utils'),
      { Player } = require('./player'),
      { attrGetterSetter } = require('./utils');

global.capitalize = capitalize;
class Game {

  constructor(_opts) {
    var opts = _opts || {},
        _renderer = opts.renderer,
        _players = opts.players || [],
        _cards = opts.cards || [],
        _clientPlayerID = opts.clientPlayerID || 1,
        _defaultCardWidth = opts.defaultCardWidth || 12,
        _defaultCardHeight = opts.defaultCardHeight || 16,
        _defaultHandWidth = opts.defaultHandWidth || 20,
        _cardBackgroundImageURL = opts.cardBackgroundImageURL || 'images/cardback01.png';

    attrGetterSetter(this, 'renderer', () => _renderer );
    this.players = _players.map( (player) => new Player(this, player) );
    this.cards = _cards.map( (card) => new Card(this, card) );
    this.clientPlayerID = _clientPlayerID;
    this.defaultCardWidth = _defaultCardWidth;
    this.defaultCardHeight = _defaultCardHeight;
    this.defaultHandWidth = _defaultHandWidth;
    this.cardBackgroundImageURL = _cardBackgroundImageURL;

    this.setupWebsocketConnection(opts.webSocket);
  }

  setupWebsocketConnection(webSocket) {
    if (!webSocket)
      return;

    this.sendChat = (user, message) => {
      if (typeof message !== 'string')
        throw new Error('Improper usage. Specify your username as the first argument, message as the second');

      webSocket.emit('chat_message', {
        user,
        message
      });
    };

    webSocket.on('chat_message', (data) => {
      console.info(`${data.user} says: ${data.message}`);
    });

    webSocket.on('disconnect', () => {
      console.info('Client disconnected');
    });
  }

  createNewPlayer() {
    var player = new Player(this);
    this.addPlayer(player);
    return player;
  }

  removePlayer(player) {
    var index = this.players.indexOf(player);
    if (index < 0)
      return;

    // remove cards
    this.cards = this.cards.filter((card) => (card.ownerID !== player.id));

    // remove player
    player.setGame(null);
    this.players.splice(index, 1);
  
  }

  addPlayer(player) {
    player.setGame(this);
    this.players.push(player);
  }

  getActivePlayers() {
    return this.players.filter((player) => player.inGame());
  }

  clearPlayers() {
    while(this.players.length)
      this.removePlayer(this.players[0]);
  }

  numberOfPlayers() {
    return this.players.length;
  }

  setPlayerTurn(player) {
    this.currentPlayerID = player;
  }

  getPlayerByID(id) {
    return this.players.find((player) => (player.id === id));
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

  generateDeck() {
    // variable "cards" equals an empty array
    var cards = [];

    // variable "suits" equals the suits defined in the const SUITS
    var suits = Card.CARDS;

    // return all the keys of the suits object
    var suitkeys = Object.keys(suits);

    // if index is less than suites length, iterate (4 suites)
    for(var x = 0; x < 4; x++){

      // if index is less than values length (13 values)
      for(var i = 0; i < suitkeys.length; i++){
        // each key in suits =
        var suitkey = suitkeys[i];

        // access value in var suitkey
        var suitvalue = suits[suitkey];

        // create a "card" object and give it a value and a suit
        var card = new Card( this, { value: suitkey, suit: Card.SUITS[x]});

        // give the object "cards" the key "card" that stores a "value" and "suit" key
        cards.push(card);
      }
    }
    return cards.slice(0, 2);
  }

  getRandomCardFromDeck() {
    var unassignedCards = this.getUnassignedCards();
    return unassignedCards[Math.floor(Math.random() * unassignedCards.length)];
  }

  addRandomCardToHand(player) {
    // use math to randomly generate a suit - get random index
    var suits = Card.SUITS;
    var randomSuit = suits[Math.floor(Math.random() * suits.length)];

    // use math to randomly generate a value - get random key from object
    var values = Object.keys(Card.CARDS);
    var randomValue = values[Math.floor(Math.random() * values.length)];

    // combine results and turn into card
    var randomCard = new Card( this, { value: randomValue, suit: randomSuit });

    // add that card to the current cards
    this.cards.push(randomCard);

    // assign that card to the current player
    this.assignCardToOwner(player, randomCard);

    return randomCard;
  }

  assignCardToOwner(owner, card) {
    card.setOwner(owner);
  }

  getCardsMatchingOwnerID(id) {
    // iterate cards and match on card.owner === player.id
    // insert matching cards into an array called "hand"
    // return the hand array, including all matching cards
    var cards = this.cards,
        hand = [];

    // for each index in array "cards"
    for (var i = 0; i < cards.length; i++){
      var card = cards[i];
      // Does this card belong to the specified player?
      if (id === card.ownerID)
        hand.push(card);
    }
    return hand;
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
  }

  calculateGameState() {

  }

  /* @team define how this will provide an interface to a game and its rules */
  //  game.dispatchAction({name: 'split', playerID: 3});
  dispatchAction(action) {
    var actionName = 'action' + capitalize(action.name);
    // var playerId = action.playerID;
    if (typeof this[actionName] !== 'function')
      return;

    // if (typeof this[playerId] !== 'number')
    //   return;

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