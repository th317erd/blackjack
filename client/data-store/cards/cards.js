const { mapToID, getID, convertToArrayOfInstances, createSelector, createCachedSelector } = require('../common'),
      playerSelectors = require('../players').selectors;

const getPlayer       = playerSelectors.getPlayer,
      getAllCards     = createSelector((state) => state.cards, convertToArrayOfInstances),
      getCard         = createCachedSelector(
                          (state, card) => state.cards[getID(card)],
                          (state, card) => card
                        )((state, card) => getID(card)),
      getCardsByOwner = createCachedSelector(getPlayer, getAllCards, (state, player, cards) => {
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
