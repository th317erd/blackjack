const {
        mapToID,
        getID,
        convertToArrayOfInstances,
        createSelector,
        createCachedSelector
      } = require('../common');

const getAllPlayers = createSelector((state) => state.players, convertToArrayOfInstances);
      getPlayer     = createCachedSelector(
                        (state, player) => state.players[getID(player)],
                        (state, player) => player
                      )((state, player) => getID(player));

module.exports = {
  template: {
    players: mapToID,
    name: {
      test : {
        bro : 'null'
      }
    }
  },
  selectors: {
    getAllPlayers,
    getPlayer
  }
};
