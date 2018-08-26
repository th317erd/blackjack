/*
  @chuck define pattern structure for suit render patterns
  Recomendation: ratios from 0.0 - 1.0 would enable patterns
  to be properly applied to cards of any size
*/
/*X would be 0.5 and Y 1.0 the shape of a rectangle.
  Set up the parameters for the edge of the Box.
  set the postions of the patterns in side the paramater for each suit for each card.
  by setting a different parameters for each card number.
*/

// http://www.milefoot.com/math/discrete/counting/images/cards.png
// X is horizonal   Y is vertical

const { Base } = require('./base'),
      { attrGetterSetter } = require('./utils');

const DEFAULT_SUIT_FONT = 'font-suits1';

const CARDS = {
  0: { // Ace
    digit: 'A',
    pattern: [
      { x: 0.5, y: 0.5, flip: false }
    ]
  },
  1: { // Two
    digit: '2',
    pattern: [
      { x: 0.5, y: 0.0, flip: false },
      { x: 0.5, y: 1.0, flip: true  }
    ]
  },
  2: { // Three
    digit: '3',
    pattern: [
      { x: 0.5, y: 0.0, flip: false },
      { x: 0.5, y: 0.5, flip: false  },
      { x: 0.5, y: 1.0, flip: true  }
    ]
  },
  3: { // Four
    digit: '4',
    pattern: [
      { x: 0.0, y: 0.0, flip: false },
      { x: 1.0, y: 0.0, flip: false  },
      { x: 0.0, y: 1.0, flip: true  },
      { x: 1.0, y: 1.0, flip: true  }

    ]
  },
  4: { // Five
    digit: '5',
    pattern: [
      { x: 0.0, y: 0.0, flip: false },
      { x: 1.0, y: 0.0, flip: false  },
      { x: 0.0, y: 1.0, flip: true  },
      { x: 1.0, y: 1.0, flip: true  },
      { x: 0.5, y: 0.5, flip: false  }

    ]
  },
  5: { //Six
    digit: '6',
    pattern: [
      { x: 0.0, y: 0.0, flip: false },
      { x: 1.0, y: 0.0, flip: false  },
      { x: 0.0, y: 1.0, flip: true  },
      { x: 1.0, y: 1.0, flip: true  },
      { x: 0.0, y: 0.5, flip: false  },
      { x: 1.0, y: 0.5, flip: false  }
    ]
  },
  6: { //seven
    digit: '7',
    pattern: [
      { x: 0.0, y: 0.0, flip: false },
      { x: 1.0, y: 0.0, flip: false  },
      { x: 0.0, y: 1.0, flip: true  },
      { x: 1.0, y: 1.0, flip: true  },
      { x: 0.0, y: 0.5, flip: false  },
      { x: 1.0, y: 0.5, flip: false  },
      { x: 0.50, y: 0.25, flip: false  }

    ]
  },
  7: { //eight
    digit: '8',
    pattern: [
      { x: 0.0, y: 0.0, flip: false },
      { x: 1.0, y: 0.0, flip: false  },
      { x: 0.0, y: 1.0, flip: true  },
      { x: 1.0, y: 1.0, flip: true  },
      { x: 0.0, y: 0.5, flip: false  },
      { x: 1.0, y: 0.5, flip: false  },
      { x: 0.50, y: 0.25, flip: false },
      { x: 0.50, y: 0.75, flip: true  }
    ]
  },
  8: { //Nine
    digit: '9',
    pattern: [
      { x: 0.0, y: 0.0, flip: false },
      { x: 1.0, y: 0.0, flip: false  },
      { x: 0.0, y: 1.0, flip: true  },
      { x: 1.0, y: 1.0, flip: true  },
      { x: 0.0, y: 0.35, flip: false  },
      { x: 1.0, y: 0.35, flip: false  },
      { x: 0.5, y: 0.5, flip: false },
      { x: 1.0, y: 0.65, flip: true },
      { x: 0.0, y: 0.65, flip: true }
    ]
  },
  9: { //Ten
    digit: '10',
    pattern: [
      { x: 0.0, y: 0.0, flip: false },
      { x: 1.0, y: 0.0, flip: false  },
      { x: 0.0, y: 1.0, flip: true  },
      { x: 1.0, y: 1.0, flip: true  },
      { x: 0.0, y: 0.35, flip: false  },
      { x: 1.0, y: 0.35, flip: false  },
      { x: 0.5, y: 0.25, flip: false },
      { x: 1.0, y: 0.65, flip: true },
      { x: 0.0, y: 0.65, flip: true },
      { x: 0.5, y: 0.75, flip: true },
    ]
  },
  10: {//Eleven
    digit: '11',
    pattern: [
      { x: 0.5, y: 0.0, flip: false },
      { x: 0.5, y: 0.5, flip: false  },
      { x: 0.5, y: 1.0, flip: true  }
    ]
  },
  11: {//Twelve
    digit: '12',
    pattern: [
      { x: 0.5, y: 0.0, flip: false },
      { x: 0.5, y: 0.5, flip: false  },
      { x: 0.5, y: 1.0, flip: true  }
    ]
  },
  12: {//Thirteen
    digit: '13',
    pattern: [
      { x: 0.5, y: 0.0, flip: false },
      { x: 0.5, y: 0.5, flip: false  },
      { x: 0.5, y: 1.0, flip: true  }
    ]
  },
  13: {//Fourteen
    digit: '14',
    pattern: [
      { x: 0.5, y: 0.0, flip: false },
      { x: 0.5, y: 0.5, flip: false  },
      { x: 0.5, y: 1.0, flip: true  }
    ]
  }
};

const SUITS = [ 'diamond', 'heart', 'spade', 'club' ];

var cardIDCounter = 1;

// Defining a class
class Card extends Base {

  // Define a generic card and its functionality here
  constructor(game, _opts) {
    super();

    if (!game)
      throw new Error('Game must be defined in order to create a player');

    var opts = _opts || {};

    if (!CARDS.hasOwnProperty(opts.value))
      throw new Error(`Invalid card value: ${opts.value}`);

    // $opts = arguements passed by _opts OR new array
    // value, suit, viewableByPlayers

    // create variable to hold value
    var _game = game;
    attrGetterSetter(this, 'game', () => _game, (val) => {
      _game = val;
      return val;
    });

    this.id = opts.id || (`${this._class}:${cardIDCounter++}`);
    this.value = opts.value;
    this.suit = opts.suit;
    this.ownerID = opts.ownerID || 0;
    this.visible = opts.visible || false;

    attrGetterSetter(this, 'digit', () => CARDS[opts.value].digit);
    attrGetterSetter(this, 'pattern', () => CARDS[opts.value].pattern);
    attrGetterSetter(this, 'suit-font', () => DEFAULT_SUIT_FONT);
    attrGetterSetter(this, 'suitFont', () => DEFAULT_SUIT_FONT);
  }

  isVisibleToCurrentPlayer() {
    return this.isVisibleTo(this.game.getCurrentPlayer());
  }

  toString() {
    return `Card ${this.value} of ${this.suit}s`;
  }

  setGame(game) {
    this.game = game;
  }

  setOwner(player) {
    this.ownerID = player.id;
  }

  isVisible(set) {
    if (set === undefined)
      return this.visible;

    this.visible = set;

    return this;
  }

  isVisibleTo(_players, set) {
    var players = _players;
    if (!players)
      return false;

    if (!(players instanceof Array))
      players = [players];

    if (!players.length)
      return false;

    // if false NOT VISIBLE
    if (set === undefined) {
      if (!this.visible)
        return false;

      // Get visibility status of all players
      return this.game.store.op(({ state, selectors }) => {
        var permissions = selectors.getPermissionsByOwner(state, this);
        debugger;
        for (var i = 0, il = players.length; i < il; i++) {
          var player = players[i],
              playerID = player.id;

          // The owner always has permission to view
          if (playerID === this.ownerID)
            continue;

          var index = permissions.findIndex((permission) => (permission.receiverID === playerID && (permission.permit & Permissions.PERMIT.VIEW)));
          if (index < 0)
            return false;
        }

        return true;
      });
    }

    return this.game.store.op(({ dispatch, actions }) => {
      for (var i = 0, il = players.length; i < il; i++) {
        var player = players[i];
        dispatch(actions.updatePermissions([new Permission(this.game, {
          ownerID: this.id,
          receiverID: player.id,
          permit: Permission.PERMIT.VIEW
        })]));
      }
    });
  }

  visibleToAllPlayers(set) {
    this.isVisibleTo(this.game.players, set);
  }
}

Card.CARDS = CARDS;
Card.SUITS = SUITS;

// Defining and returning a simple object
// With a single key: Card
module.exports = {
  Card
};
