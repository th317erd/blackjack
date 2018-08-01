const { DataStore } = require('../../client/data-store');

describe("DataStore", function() {
  beforeEach(function() {
    this.store = new DataStore();
  });

  it("should be able to use store", function() {
    var store = this.store;
    store.op(({ dispatch, actions }) => {
      dispatch(actions.updatePlayers([
        {
          id: 5,
          name: 'Test Bro'
        }
      ]));
    });

    var players = store.op(({ state, selectors }) => selectors.getAllPlayers(state));
    expect(players.length).toBe(1);
    expect(players[0].id).toBe(5);
    expect(players[0].name).toBe('Test Bro');
  });
});
