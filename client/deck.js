const { CardOwner } = require('./card-owner');

class Deck extends CardOwner {
  constructor(game, _opts) {
    super(_opts);
  }

  toString() {
    return `Deck ${this.id}`;
  }
}

module.exports = {
  Deck
};
