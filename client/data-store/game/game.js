const { createSelector } = require('../common'),
      playerSelectors = require('../players').selectors;


const getCurrentPlayerID      = createSelector((state) => state.game.currentPlayerID, (s, playerID) => playerID),
      getClientPlayerID       = createSelector((state) => state.game.clientPlayerID, (s, playerID) => playerID),
      getCurrentPlayer        = createSelector(getCurrentPlayerID, (s, playerID) => playerSelectors.getPlayer(playerID));
      getClientPlayer         = createSelector(getClientPlayerID, (s, playerID) => playerSelectors.getPlayer(playerID)),
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
    getCurrentPlayerID,
    getClientPlayerID,
    getCurrentPlayer,
    getClientPlayer,
    defaultCardWidth,
    defaultCardHeight,
    defaultHandWidth,
    cardBackgroundImageURL
  }
};
