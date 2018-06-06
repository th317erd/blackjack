const { CardOwner } = require('./card-owner');
class Player extends CardOwner {
  constructor(game) {
    super();

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
}

module.exports = {
  Player
};
