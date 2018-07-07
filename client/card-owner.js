var ownerIDCounter = 1;

class CardOwner {
  constructor(_opts) {
    var opts = _opts || {};
    this.id = (opts.id) ? opts.id : ownerIDCounter++;
  }

}

module.exports = {
  CardOwner
};
