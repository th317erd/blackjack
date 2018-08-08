const { DataStore } = require('../../client/data-store'),
      { Game } = require('../../client/game');

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

    var players = store.op(({ state, selectors }) => selectors.getAllPlayers(state));
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

    function diffObjectChanges(_a, _b, parentKey, diffReport = [], alreadyVisited = []){
      var a = _a, 
          b = _b;

      // if a or b is empty
      if (a == null || b == null){
        diffReport.push({type: 'value', key: parentKey, aValue: a, bValue: b });
        return diffReport;
      } 

      // return the primive value
      a = a.valueOf();
      b = b.valueOf();
  
      // if either is primitive see if they're the same
      if((['string', 'number', 'boolean'].indexOf(typeof a) >= 0 || 
          ['string', 'number', 'boolean'].indexOf(typeof b) >= 0) && 
          a !== b) {
        diffReport.push({type: 'value', key: parentKey, aValue: a, bValue: b }); 
        return diffReport;
      }

      // check if array has been checked already
      if( alreadyVisited.indexOf(a) >= 0 && alreadyVisited.indexOf(b) >= 0 )
        return;
      
      alreadyVisited.push(a);
      alreadyVisited.push(b);
 
      // make sure keys are the same (is valid object or array)
      var aKeys = Object.keys(a), 
          bKeys = Object.keys(b),
          keys = Object.keys(aKeys.concat(bKeys).reduce((obj, key) => (obj[key] = obj), {}));
          
      for (var i = 0; i < keys.length; i++ ){
        //keys is the unique keys
        var key = keys[i], 
            aVal = a[key], 
            bVal = b[key];

        // recursion 
        diffObjectChanges(aVal, bVal, (parentKey != null) ? (parentKey + '.' + key) : key, diffReport, alreadyVisited);

      }
      return diffReport;
    };

    var diffReport = diffObjectChanges('derp', 'hello');
    console.log(diffReport[0]);

  });
});
