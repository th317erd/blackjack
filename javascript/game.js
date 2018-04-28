ktExport('game.js', () => {
  class Game {
    // Here we will define game rules
    // A game will also hold some number of cards and players

    /* @mason: Define the structure of data for game instances
       How will cards be stored and acted upon?
       How will players be stored and acted upon?
       How will turns be handled?
    */

    constructor(player_one, player_two) {
      this.player_one = player_one;
      this.player_two = player_two;
    }

    /* @team define how this will provide an interface to a game and its rules */
  }

  const PLAYERS =  {
    player_one: {
      cards: [
        { x: "hearts", y: "2" },
        { x: "spades", y: "3" }
      ],
      age: 33,
      name: "Mason"
    },
    player_two: {
      cards: [
        { x: "clubs", y: "4" },
        { x: "spades", y: "7" }
      ],
      age: 30,
      name: "Wyatt"
    }
  };

  // make sure player exist
  // create function to create game
  function createGameAndCallPlayers() {
    // call class to instanciate game with players
    var newGame = new Game(PLAYERS.player_one, PLAYERS.player_two);
    console.log(newGame);
    // check if players exist
    if (new Game(PLAYERS.player_one) != null && new Game(PLAYERS.player_two) != null) {
      // the two required players exist
      console.log("looks like there is two players");

      // define the end of the game
      var gameEnd = false;
      console.log(gameEnd);
      // var winner == null;
      // define a turn inside the check if players exist
      /*
      turn is set to zero, if the variable gameEnd is set to false
      continue running game and add 1 to var turn
      if gameEnd returns true contine program
      */
      while (gameEnd == false) {
        console.log(gameEnd);
        var gameEnd = true;
        console.log(gameEnd);
      }

    } else {
      // the two required players dont exist
      console.log("looks like we need more players");
      return
    }
  }

createGameAndCallPlayers();

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


  // console.log("mason");
  // console.log( new Game(PLAYERS.player_one, PLAYERS.player_two) );
  return {
    Game
  };
});
