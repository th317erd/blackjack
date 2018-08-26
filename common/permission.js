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
      throw new Error('"game" must be defined in order to create a permission');

    var opts = _opts || {},
        _game = game;

    if (!opts.ownerID)
      throw new Error('"ownerID" must be defined in order to create a permission');

    if (!opts.receiverID)
      throw new Error('"receiverID" must be defined in order to create a permission');

    attrGetterSetter(this, 'game', () => _game, (val) => {
      _game = val;
      return val;
    });

    this.ownerID = opts.ownerID;
    this.receiverID = opts.receiverID;
    this.permit = opts.permit || 0;
    this.id = `${this.ownerID}::${this.receiverID}`;
  }

  toString() {
    return `Permission ${this.id}`;
  }
}

Permission.PERMIT = PERMIT;

module.exports = {
  Permission
};
