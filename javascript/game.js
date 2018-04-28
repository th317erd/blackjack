ktExport('game.js', () => {
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
    }

    /* @team define how this will provide an interface to a game and its rules */

    /* @mason defined all methods for players
      i.e changeCurrentPlayer, addPlayer, removePlayer, etc...
    */

    addPlayer(player) {
      /* @mason start here */
    }

    /* @paul Add methods for cards!
       i.e. generateDeck, assignCardToPlayer, getPlayerCards, etc...
    */
    getPlayerCards(player) {
      // iterate cards and match on card.owner === player.id
    }

    /* @whitley & @wyatt
      Define methods for game mechanics
      i.e. checkPlayIsValid(player, ???), updateBeforePlay, updateAfterPlay, etc...
    */
    update() {


    }

    checkPlayIsValid(action) {
      return true;
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

  return {
    Game
  };
});
