const { Card } = require('./card'),
      { capitalize } = require('./utils');

global.capitalize = capitalize;

class Game {

  /* @mason: Define the structure of data for game instances
      How will cards be stored and acted upon?
      How will players be stored and acted upon?
      How will turns be handled?
  */

  constructor(_opts) {
    var opts = _opts || {};

    this.renderer = opts.renderer;
    this.players = [];
    this.cards = [];
    this.hand = 0;
    this.currentPlayer = 1;
  }

  removePlayer(player) {
    var index = this.players.indexOf(player);
    if (index >= 0) {
      player.setGame(null);
      this.players.splice(index, 1);
    }
  }

  addPlayer(player) {
    player.setGame(this);
    this.players.push(player);
  }

  getActivePlayers() {
    return this.players.filter((player) => player.inGame());
  }

  clearPlayers() {
    var players = this.players;
    for (var i = 0, il = players.length; i < il; i++)
      players[i].setGame(null);

    this.players = [];
  }

  numberOfPlayers() {
    return this.players.length;
  }

  setPlayerTurn(player) {
    this.currentPlayer = player;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  getPlayerByID(id) {
    return this.players.find((player) => (player.id === id));
  }

  /* @team define how this will provide an interface to a game and its rules */

  /* @mason defined all methods for players
    i.e changeCurrentPlayer, addPlayer, removePlayer, etc...
  */

  /* @paul Add methods for cards!
      i.e. generateDeck, assignCardToPlayer, getPlayerCards, etc...
  */
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

        // create a "card" and give it a value and a suit
        var card = new Card(suitkey,Card.SUITS[x]);

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

  addRandomCardToHand(player){
    // use math to randomly generate a suit - get random index
    var suits = Card.SUITS;
    var randomSuit = suits[Math.floor(Math.random() * suits.length)];

    // use math to randomly generate a value - get random key from object
    var values = Object.keys(Card.CARDS);
    var randomValue = values[Math.floor(Math.random() * values.length)];

    // combine results and turn into card
    var randomCard = new Card(randomValue, randomSuit);

    // add that card to the current cards
    this.cards.push(randomCard);

    // assign that card to the current player
    this.assignCardToOwner(player, randomCard);
  }

  assignCardToOwner(owner, card) {
    card.setOwner(owner);
  }

  getCardsMatchingOwnerId(id) {
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

  getPlayerHand(player){
    return this.getCardsMatchingOwnerId(player.id);
  }

  getUnassignedCards(){
    return this.getCardsMatchingOwnerId(0);
  }

  update() {

  }

  async render() {
  }

  calculateGameState() {

  }

  checkPlayIsValid() {
    return true;
  }
  /* @team define how this will provide an interface to a game and its rules */
  dispatchAction(action) {
    var actionName = 'action' + capitalize(action.name);
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
