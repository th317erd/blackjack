const {
        mapToID,
        getID,
        convertToArrayOfInstances,
        createSelector,
        createCachedSelector,
        convertToInstance
      } = require('../common'),
      playerSelectors = require('../players').selectors;

const getPlayer       = playerSelectors.getPlayer,
      getCards        = createSelector((state) => state.cards, convertToArrayOfInstances),
      getCard         = createCachedSelector(
                          (state, card) => state.cards[getID(card)],
                          convertToInstance
                        )((state, card) => getID(card)),
      getCardsByOwner = createCachedSelector(getPlayer, getCards, (state, player, cards) => {
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
    getCards,
    getCard,
    getCardsByOwner
  }
};
