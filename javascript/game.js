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
    //change currentPlayer, , removePlayer,
    //addPlayer, clearPlayers
    removePlayer(player) {
      for (var i=array.length-1; i>=0; i--) {
        if (this.players[i] === player) {
            this.players.splice(i, 1);
        }
      }
    }

    addPLayer(player) {
      this.players.push(player);
    }

    clearPlayers() {
      while (this.players.length) { this.players.pop(); }
    }
    /* @team define how this will provide an interface to a game and its rules */
  }
  return {
    Game
  };
});
