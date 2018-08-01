const { DataStore } = require('../../client/data-store');

describe("DataStore", function() {
  beforeEach(function() {
    this.derp = 'test';
    this.store = new DataStore();
  });

  it("should be able to use store", function() {
    var store = this.store;
    store.op((state, selectors, dispatch, actions) => {
      dispatch(actions.updatePlayers([
        {
          id: 5,
          name: 'Test Bro'
        }
      ]));
    });

    var players = store.op((state, selectors) => selectors.getAllPlayers(state));
    expect(players.length).toBe(1);
    expect(players[0].id).toBe(5);
    expect(players[0].name).toBe('Test Bro');
  });

  it("should be able to diff data", function() {
    var store = this.store;
    store.op((state, selectors, dispatch, actions) => {
      dispatch(actions.updatePlayers([
        {
          id: 5,
          name: 'Test Bro'
        }
      ]));
    });

    //snapshot
    var state = store.state;
    store.op((state, selectors, dispatch, actions) => {
      dispatch(actions.updateNameTestBro('different'));
    });
    var newState = store.state;

    //throws exception if different
    // expect(players.length).toBe(1);

    function diffObjectChanges(a, b){
      if( a !== b ){
        
        console.log('not equal, here are the differences:');
  
        if (a.length !== b.length ){
         
          arrayIndexs = a.length - b.length;
  
          console.log( arrayIndexs + ' index were removed from a');
  
          for (var i=0; i < a.length; i++){
            if (a[i] !== b[i]){
              // console.log('index' + a[i] + 'was changed to' + b[i]);
              console.log( a[i] + ' was changed to ' + b[i]);
            }
          } 
        }
      } else {
        return;
      };
    };

    diffObjectChanges(state, newState);

  });
});
