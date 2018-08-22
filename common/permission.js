const { Base } = require('./base'),
      { attrGetterSetter } = require('./utils');

var permissionIDCounter = 1;

const PERMIT = {
  VIEW: 0x01
};

class Permission extends Base {
  constructor(game, _opts) {
    super(_opts);

    if (!game)
      throw new Error('Game must be defined in order to create a permission');

    var opts = _opts || {},
        _game = game;

    attrGetterSetter(this, 'game', () => _game, (val) => {
      _game = val;
      return val;
    });

    this.id = (opts.id) ? opts.id : `${this._class}:${permissionIDCounter++}`;
    this.ownerID = opts.ownerID;
    this.receiverID = opts.receiverID;
    this.permit = opts.permit || 0;
  }

  toString() {
    return `Permission ${this.id}`;
  }
}

Permission.PERMIT = PERMIT;

module.exports = {
  Permission
};
