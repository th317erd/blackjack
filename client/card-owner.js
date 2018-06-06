var ownerIDCounter = 1;

class CardOwner {
  constructor() {
    this.id = ownerIDCounter++;
  }

}

module.exports = {
  CardOwner
};
