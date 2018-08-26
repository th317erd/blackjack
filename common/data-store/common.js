const { isObject, toNumber } = require('../utils'),
      RP = require('redux-panoptic'),
      createSelector = require('reselect').createSelector,
      createCachedSelector = require('re-reselect').default,
      noop = (val) => val;

function mapToKeys(_keys, formatter = noop) {
  var keys = (_keys instanceof Array) ? _keys : [_keys];

  return RP.createReducer(function(_data, remove) {
    var newState = Object.assign({}, this),
        data = (_data instanceof Array) ? _data : [_data],
        now = (new Date()).getTime();

    for (var i = 0, il = data.length; i < il; i++) {
      var val = data[i];
      if (!val)
        continue;

      val = val.valueOf();

      for (var j = 0, jl = keys.length; j < jl; j++) {
        var index = keys[j],
            key = val[index];

        if (key == null)
          continue;

        key = formatter(key, val, index);

        if (remove === true) {
          delete newState[key];
          continue;
        }

        var currentVal = newState[key];
        if (currentVal && currentVal.data && val && val.data)
          val = Object.assign({}, currentVal.data, val.data);

        newState[key] = {
          lastUpdateTime: now,
          data: val
        };
      }
    }

    return newState;
  }, {});
}

function convertToArray(formatter = noop) {
  return function(state) {
    var items = [];

    for (var i = 1, il = arguments.length; i < il; i++) {
      var thisArg = arguments[i];
      if (thisArg == null || thisArg === '')
        continue;

      var keys = Object.keys(thisArg);
      for (var j = 0, jl = keys.length; j < jl; j++) {
        var key = keys[j],
            item = thisArg[key];

        if (!item)
          continue;

        items.push(formatter(state, item.data));
      }
    }

    return items;
  };
}

function convertToInstance(state, _data) {
  var game = state._game,
      data = (_data && _data.data) ? _data.data : _data;

    return (data && data._class) ? game.instantiateClassByName(data._class, [data]) : data;
}

function getID(obj) {
  var id = (obj && obj.hasOwnProperty('id')) ? obj.id : obj;
  return id;
}

module.exports = {
  mapToID: mapToKeys('id'),
  mapToKeys,
  getID,
  createReducer: RP.createReducer,
  convertToArray,
  convertToInstance,
  convertToArrayOfInstances: convertToArray(convertToInstance),
  createSelector: function(...args) {
    return createSelector((state) => state, ...args);
  },
  createCachedSelector: function(...args) {
    return createCachedSelector((state) => state, ...args);
  }
};
