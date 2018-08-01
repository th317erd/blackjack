const { mapToID, getID, convertToArray, createSelector, createCachedSelector } = require('../common'),
      playerSelectors = require('../players').selectors;

const getPlayer = playerSelectors.getPlayer,
      getAllCards     = createSelector((state) => state.cards, convertToArray);
      getCard         = createCachedSelector(
                          (state, card) => state.cards[getID(card)],
                          (card) => card
                        )((state, player) => getID(player)),
      getCardsByOwner = createCachedSelector(getPlayer, getAllCards, (player, cards) => {
                          if (!player)
                            return [];

                          var playerID = player.id;
                          return cards.filter((card) => (card.ownerID === playerID));
                        })((state, player) => getID(player));

module.exports = {
  template: {
    cards: mapToID
  },
  selectors: {
    getAllCards,
    getCard,
    getCardsByOwner
  }
};
