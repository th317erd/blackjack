const { CardOwner } = require('./card-owner'),
      { attrGetterSetter } = require('./utils');

class Player extends CardOwner {
  constructor(game, _opts) {
    var opts = _opts || {};
    super(opts);

    if (!game)
      throw new Error('Game must be defined in order to create a player');

    var _game = game;
    attrGetterSetter(this, 'game', () => _game, (val) => {
      _game = val;
      return val;
    });
    attrGetterSetter(this, 'hand', () => this.game.getPlayerHand(this));

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
