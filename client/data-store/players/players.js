const { mapToID, getID, convertToArray, createSelector, createCachedSelector } = require('../common');

const getAllPlayers = createSelector((state) => state.players, convertToArray);
      getPlayer     = createCachedSelector(
                        (state, player) => state.players[getID(player)],
                        (player) => player
                      )((state, player) => getID(player));

module.exports = {
  template: {
    players: mapToID
  },
  selectors: {
    getAllPlayers,
    getPlayer
  }
};
