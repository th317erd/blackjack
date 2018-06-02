const { Card } = require('./card'),
      { capitalize } = require('./utils');

global.capitalize = capitalize;

class Game {
  // Here we will define game rules
  // A game will also hold some number of cards and players

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
    this.currentPlayer = null;
  }

  //change currentPlayer, , removePlayer,
  //addPlayer, clearPlayers
  removePlayer(player) {
    for (var i=array.length-1; i>=0; i--) {
      if (this.players[i] === player) {
          this.players.splice(i, 1);
      }
    }
  }

  addPlayer(player) {
    this.players.push(player);
  }

  clearPlayers() {
    this.players = [];
  }

  // total number of players
  numberOfPlayers() {
    return this.players.length;
  }

  setPlayerTurn(player) {
    this.currentPlayer = player;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  /* @team define how this will provide an interface to a game and its rules */

  /* @mason defined all methods for players
    i.e changeCurrentPlayer, addPlayer, removePlayer, etc...
  */

  /* @paul Add methods for cards!
      i.e. generateDeck, assignCardToPlayer, getPlayerCards, etc...
  */
  generateDeck() {
    // variable "deck" equals an empty array
    var deck = [];
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
        //card.ownerID = // math to generate random cards
        // give the object "deck" the key "card" that stores a "value" and "suit" key
        deck.push(card);
      }
    }
    //return deck;
    return deck.slice(0, 2);
  }
  //TESTING var g=new KingTut.Game();g.generateDeck()

  getRandomCardFromDeck() {
    // generate a random card from deck
    var unassignedCards = this.getUnassignedCards();
    return unassignedCards[Math.floor(Math.random() * unassignedCards.length)];
  }

  // get a truly random card - assign all the values

  assignCardToPlayer(player, card) {
    card.setOwner(player);
  }

  getCardsMatchingOwnerId(id) {
    // iterate cards and match on card.owner === player.id
    // insert matching cards into an array called "hand"
    // return the hand array, including all matching cards
    var deck = this.deck,
        hand = [];

    // for each index in array "deck"
    for (var i = 0; i < deck.length; i++){
      var card = deck[i];
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

  /* @whitley & @wyatt
    Define methods for game mechanics
    i.e. checkPlayIsValid(player, ???), updateBeforePlay, updateAfterPlay, etc...
  */
  update() {

  }

  render() {

  }

  /* @chuck calculate if there is a winner */
  calculateGameState() {

  }

  checkPlayIsValid() {
    return true;
  }
  /* @team define how this will provide an interface to a game and its rules */
  dispatchAction(action) {
    if (this.checkPlayIsValid(action)) {
      var actionName = 'action' + capitalize(action.name);
      return this[actionName](action);
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
