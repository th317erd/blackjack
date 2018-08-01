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
        dispatch = store.dispatch.bind(store),
        subscribers = [],
        oldState = store.getState();

    attrGetterSetter(this, '_subscribers', () => subscribers, noop);
    attrGetterSetter(this, 'dispatch', () => dispatch, noop);
    attrGetterSetter(this, 'actions', () => store.actions, noop);
    attrGetterSetter(this, 'selectors', () => dataStoreTemplate.selectors, noop);
    attrGetterSetter(this, 'state', () => store.getState(), noop);

    var _disconnectStoreListener = store.subscribe(() => {
      var state = store.getState();

      for (var i = 0, il = subscribers.length; i < il; i++) {
        var subscriber = subscribers[i];
        subscriber.callback.call(this, state, oldState, this);
      }

      oldState = state;
    });

    attrGetterSetter(this, 'stopListening', () => {
      subscribers = [];
      _disconnectStoreListener();
    }, noop);
  }

  destroy() {
    if (typeof this.stopListening === 'function')
      this.stopListening();
  }

  op(func) {
    return func.call(this, this.state, this.selectors, this.dispatch, this.actions);
  }

  subscribe(func) {
    if (typeof func !== 'function')
      throw new Error('Subscribe argument must be a function');

    var subscribers = this._subscribers,
        subscriber = {
          callback: func
        };

    subscribers.push(subscriber);

    return function() {
      var index = subscribers.indexOf(subscriber);
      if (index >= 0)
        subscribers.splice(index, 1);
    };
  }
}

module.exports = {
  DataStore
};
