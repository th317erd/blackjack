const { CardOwner } = require('./card-owner'),
      { attrGetterSetter } = require('./utils');

class Player extends CardOwner {
  constructor(game, _opts) {
    super(game, _opts);
  }

  toString() {
    return `Player ${this.id}`;
  }

  inGame() {
    return true;
  }
}

module.exports = {
  Player
};
