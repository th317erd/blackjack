const { Base } = require('./base'),
      { attrGetterSetter } = require('./utils');

var ownerIDCounter = 1;

class CardOwner extends Base{
  constructor(game, _opts) {
    super();

    if (!game)
      throw new Error('Game must be defined in order to create a player');

    var opts = _opts || {},
        _game = game;

    attrGetterSetter(this, 'game', () => _game, (val) => {
      _game = val;
      return val;
    });

    this.id = (opts.id) ? opts.id : ownerIDCounter++;

    attrGetterSetter(this, 'hand', () => this.game.getCardOwnersHand(this));
  }

  setGame(game) {
    this.game = game;
  }
}

module.exports = {
  CardOwner
};
