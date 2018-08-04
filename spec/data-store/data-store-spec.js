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

    //throws exception if different
    // expect(players.length).toBe(1);

    function diffObjectChanges(a, b){
      if( a !== b ){
        console.log('not equal, here are the differences:');

        Object.values(a).forEach((value,index)=> console.log('value:' + value, 'index:' + index));

        console.log('a:', Object.values(a));
        console.log('b:', Object.values(b));

        // itterate over object.keys
        // recall diffobject change

      } else {
        return;
      };
    };

    diffObjectChanges(state, newState);

  });
});
