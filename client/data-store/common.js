const { isObject } = require('../utils'),
      RP = require('redux-panoptic'),
      createSelector = require('reselect').createSelector,
      createCachedSelector = require('re-reselect').default;

function mapToKeys(_keys) {
  var keys = (_keys instanceof Array) ? _keys : [_keys];

  return RP.createReducer(function(_data, remove) {
    var newState = Object.assign({}, this),
        data = (_data instanceof Array) ? _data : [_data],
        now = (new Date()).getTime();

    for (var i = 0, il = data.length; i < il; i++) {
      var val = data[i];
      if (!val)
        continue;

      for (var j = 0, jl = keys.length; j < jl; j++) {
        var key = val[keys[j]];
        if (key == null)
          continue;

        if (remove === true) {
          delete newState[key];
          continue;
        }

        var currentVal = newState[key];
        if (currentVal && currentVal.data && val && val.constructor === Object.constructor)
          val = Object.assign({}, currentVal, val);

        newState[key] = {
          lastUpdateTime: now,
          data: val
        };
      }
    }

    return newState;
  }, {});
}

function convertToArray() {
  var items = [];

  for (var i = 0, il = arguments.length; i < il; i++) {
    var thisArg = arguments[i];
    if (thisArg == null || thisArg === '')
      continue;

    var keys = Object.keys(thisArg);
    for (var j = 0, jl = keys.length; j < jl; j++) {
      var key = keys[j],
          item = thisArg[key];

      if (!item)
        continue;

      items.push(item.data);
    }
  }

  return items;
}

function getID(obj) {
  return (isObject(obj)) ? obj.id : obj;
}

module.exports = {
  mapToID: mapToKeys('id'),
  mapToKeys,
  getID,
  createReducer: RP.createReducer,
  convertToArray,
  createSelector,
  createCachedSelector
};
