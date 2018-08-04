const {
        mapToID,
        getID,
        convertToArrayOfInstances,
        createSelector,
        createCachedSelector,
        convertToInstance
      } = require('../common');

const getPlayers    = createSelector((state) => state.players, convertToArrayOfInstances);
      getPlayer     = createCachedSelector(
                        (state, player) => state.players[getID(player)],
                        convertToInstance
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
    getPlayers,
    getPlayer
  }
};
