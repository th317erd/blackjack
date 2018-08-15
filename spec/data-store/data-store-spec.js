const { DataStore } = require('../../client/data-store'),
      { Game } = require('../../client/game'),
      { diffObjectChanges } = require('../../client/utils');

describe("DataStore", function() {
  beforeEach(function() {
    this.game = new Game();
    this.store = new DataStore(this.game);
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

    var players = store.op(({ state, selectors }) => selectors.getPlayers(state));
    expect(players.length).toBe(1);
    expect(players[0].id).toBe(5);
    expect(players[0].name).toBe('Test Bro');
  });

  it("should be able to diff data", function() {
    var store = this.store;
    store.op(({dispatch, actions}) => {
      
      dispatch(actions.updatePlayers([
        {
          id: 5,
          name: 'Test Bro'  
        }
      ]));
    });
    
    //snapshot
    var state = store.state;
    store.op(({dispatch, actions}) => {
      dispatch(actions.updateNameTestBro('different'));
    });
    var newState = store.state;

    var diffReport = diffObjectChanges('derp', 'hello');
    console.log(diffReport[0]);

  });
});
