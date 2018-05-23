const { Card } = require('./card');

class Game {
  // Here we will define game rules
  // A game will also hold some number of cards and players

  /* @mason: Define the structure of data for game instances
      How will cards be stored and acted upon?
      How will players be stored and acted upon?
      How will turns be handled?
  */

  constructor() {
    this.players = [];
    this.cards = [];
    this.currentPlayer = 0;
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
    while (this.players.length) { this.players.pop(); }
    this.players = [];
  }

  // total number of players
  numberOfPlayers() {
    return this.players.length;
  }

  setPlayerTurn(player) {
    this.currentPlayer = player;
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
        card.ownerID = // math to generate random cards

        // give the object "deck" the key "card" that stores a "value" and "suit" key
        deck.push(card);
      }
    }
    return deck;
  }
  //TESTING var g=new KingTut.Game();g.generateDeck()

  getRandomCard(){
    // generate a random card from deck
    var deck = this.deck;
    var cardIndex = Math.floor(Math.random() * deck.length);
    var randomCard = deck[cardIndex]; 
    return randomCard;
  }

  assignCardToPlayer(player,card) {
    card.ownerID = player.id;
  }
  getPlayerCards(player) {
    // iterate cards and match on card.owner === player.id
    // get the deck from generateDeck
    var deck = this.deck;
    // get the players from addPlayer
    var players = this.players;
    var hand = [];

    //var hand = 2 cards from game.deck

    // for each index in array "players" define it as a "player"
    for (var i = 0; i < players.length; i++){
      var player = player[i];
      // for each player deal 2 cards each from game.deck
      if (player.id === card.ownerID)
        hand.push(hand);
    }
    return hand;
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

  checkPlayIsValid(action) {
    return true;
  }
  /* @team define how this will provide an interface to a game and its rules */
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
