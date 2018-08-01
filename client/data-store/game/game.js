const {
        mapToID,
        getID,
        convertToArrayOfInstances,
        createSelector,
        createCachedSelector
      } = require('../common'),
      playerSelectors = require('../players').selectors;


const getCurrentPlayer        = createSelector(
                                  (state) => state.game.currentPlayerID,
                                (state, playerID) => {
                                  return playerSelectors.getPlayer(playerID);
                                });
      getClientPlayerID       = createSelector(
                                  (state) => state.game.clientPlayerID,
                                (state, playerID) => {
                                  return playerSelectors.getPlayer(playerID);
                                }),
      defaultCardWidth        = createSelector((state) => state.game.defaultCardWidth, (state, val) => val),
      defaultCardHeight       = createSelector((state) => state.game.defaultCardHeight, (state, val) => val),
      defaultHandWidth        = createSelector((state) => state.game.defaultHandWidth, (state, val) => val),
      cardBackgroundImageURL  = createSelector((state) => state.game.cardBackgroundImageURL, (state, val) => val),

module.exports = {
  template: {
    game: {
      currentPlayerID: 1,
      clientPlayerID: 1,
      defaultCardWidth: 12,
      defaultCardHeight: 16,
      defaultHandWidth: 20,
      cardBackgroundImageURL: 'images/cardback01.png'
    }
  },
  selectors: {
    getCurrentPlayer,
    getClientPlayerID,
    defaultCardWidth,
    defaultCardHeight,
    defaultHandWidth,
    cardBackgroundImageURL
  }
};
