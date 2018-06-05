const { attrGetterSetter } = require('./utils');

var playerCounter = 1;

class Player {
  constructor(game) {
    if (!game)
      throw new Error('Game must be defined in order to create a player');

    this.game = game;
    attrGetterSetter(this, 'hand', () => this.game.getPlayerCards(this), (value) => {});
  }

  setGame(game) {
    this.game = game;
  }

  inGame() {
    return true;
  }

  // Here we will define a player

  // needs a value to assign cards to

  // needs a bankroll

  // needs the ability to

  // Having a structure like this will help with game rules and permissions (i.e. turns)
  /* @whitley, define the structure of this class and its data.
      Recommendations: Need a constructor
      A name is needed, age might be nice
      Color might be cool
      A player id might be a good thing to be able to match cards to players
  */
}

module.exports = {
  Player
};
