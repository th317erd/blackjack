const {
        mapToKeys,
        getID,
        convertToArrayOfInstances,
        createSelector,
        createCachedSelector,
        convertToInstance
      } = require('../common');

const getPermissions            = createSelector((state) => state.permissions, convertToArrayOfInstances),
      getPermission             = createCachedSelector(
                                    (state) => state,
                                    (state, owner) => getID(owner),
                                    (state, owner, receiver) => getID(receiver),
                                    (state, ownerID, receiverID) => {
                                      if (!ownerID || !receiverID)
                                        return

                                      return convertToInstance(state, state.permissions[`${ownerID}::${receiverID}`]);
                                    }
                                  )((state, owner, receiver) => `${getID(owner)}::${getID(receiver)}`),
      getPermissionsByOwner     = createCachedSelector((state, id) => getID(id), getPermissions, (state, ownerID, permissions) => {
                                    if (!ownerID)
                                      return [];

                                    return permissions.filter((permission) => (permission.ownerID === ownerID));
                                  })((state, player) => getID(player)),
      getPermissionsByReceiver  = createCachedSelector((state, id) => getID(id), getPermissions, (state, receiverID, permissions) => {
                                    if (!ownerID)
                                      return [];

                                    return permissions.filter((permission) => (permission.receiverID === receiverID));
                                  })((state, player) => getID(player));

module.exports = {
  template: {
    permissions: mapToKeys(['id', 'combined'], (key, val, index) => {
      if (index === 'id')
        return key;

      return `${val.ownerID}::${val.receiverID}`;
    })
  },
  selectors: {
    getPermissions,
    getPermission,
    getPermissionsByOwner,
    getPermissionsByReceiver
  }
};
