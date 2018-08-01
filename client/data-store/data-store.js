const {
        applyMiddleware,
        buildStore,
        createReducer,
        _actionNameAlias
      } = require('redux-panoptic'),
      players = require('./players'),
      cards = require('./cards'),
      { noop, attrGetterSetter } = require('../utils');

// Define our template for our store
const dataStoreTemplate = {
  template: Object.assign({}, players.template, cards.template),
  selectors: Object.assign({}, players.selectors, cards.selectors)
};

class DataStore {
  constructor(_opts) {
    // Create some middleware to help us log dispatches
    var opts = _opts || {},
        dispatchActionMiddleware = (store) => (next) => (action) => {
          console.log('Dispatching action [' + action.type + ']: ' + JSON.stringify(action.payload));
          return next(action);
        };

    var store = (opts.debug) ? buildStore(dataStoreTemplate.template, applyMiddleware(dispatchActionMiddleware)) : buildStore(dataStoreTemplate.template),
        dispatch = store.dispatch.bind(store);

    attrGetterSetter(this, 'dispatch', () => dispatch, noop);
    attrGetterSetter(this, 'actions', () => store.actions, noop);
    attrGetterSetter(this, 'selectors', () => dataStoreTemplate.selectors, noop);
    attrGetterSetter(this, 'state', () => store.getState(), noop);
  }

  op(func) {
    return func.call(this, this.state, this.selectors, this.dispatch, this.actions);
  }
}

module.exports = {
  DataStore
};
