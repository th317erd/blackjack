ktExport('card.js', () => {
  /*
    @chuck define pattern structure for suit render patterns
    Recomendation: ratios from 0.0 - 1.0 would enable patterns
    to be properly applied to cards of any size
  */
  /*X would be 0.5 and Y 1.0 the shape of a rectangle.
   Set up the parameters for the edge of the Box.
   set the postions of the patterns in side the paramater for each suit for each card.
   by setting a different parameters for each card number.
  */

  // http://www.milefoot.com/math/discrete/counting/images/cards.png
  // X is horizonal   Y is vertical
  const CARDS = {
    0: { // Ace
      digit: 'A',
      pattern: [
        { x: 0.5, y: 0.5, flip: false }
      ]
    },
    1: { // Two
      digit: '2',
      pattern: [
        { x: 0.5, y: 0.0, flip: false },
        { x: 0.5, y: 1.0, flip: true  }
      ]
    },
    2: { // Three
      digit: '3',
      pattern: [
        { x: 0.5, y: 0.0, flip: false },
        { x: 0.5, y: 0.5, flip: false  },
        { x: 0.5, y: 1.0, flip: true  }
      ]
    },
    3: { // Four
      digit: '4',
      pattern: [
        { x: 0.0, y: 0.0, flip: false },
        { x: 1.0, y: 0.0, flip: false  },
        { x: 0.0, y: 1.0, flip: true  },
        { x: 1.0, y: 1.0, flip: true  }

      ]
    },
    4: { // Five
      digit: '5',
      pattern: [
        { x: 0.0, y: 0.0, flip: false },
        { x: 1.0, y: 0.0, flip: false  },
        { x: 0.0, y: 1.0, flip: true  },
        { x: 1.0, y: 1.0, flip: true  },
        { x: 0.5, y: 0.5, flip: false  }

      ]
    },
    5: { //Six
      digit:'6',
      pattern: [
        { x: 0.0, y: 0.0, flip: false },
        { x: 1.0, y: 0.0, flip: false  },
        { x: 0.0, y: 1.0, flip: true  },
        { x: 1.0, y: 1.0, flip: true  },
        { x: 0.0, y: 0.5, flip: false  },
        { x: 1.0, y: 0.5, flip: false  }
      ]
    },
    6: { //seven
      digit:'7',
      pattern: [
        { x: 0.0, y: 0.0, flip: false },
        { x: 1.0, y: 0.0, flip: false  },
        { x: 0.0, y: 1.0, flip: true  },
        { x: 1.0, y: 1.0, flip: true  },
        { x: 0.0, y: 0.5, flip: false  },
        { x: 1.0, y: 0.5, flip: false  },
        { x: 0.50, y: 0.25, flip: false  }

      ]
    },
    7: { //eight
      digit:'8',
      pattern: [
        { x: 0.0, y: 0.0, flip: false },
        { x: 1.0, y: 0.0, flip: false  },
        { x: 0.0, y: 1.0, flip: true  },
        { x: 1.0, y: 1.0, flip: true  },
        { x: 0.0, y: 0.5, flip: false  },
        { x: 1.0, y: 0.5, flip: false  },
        { x: 0.50, y: 0.25, flip: false },
        { x: 0.50, y: 0.75, flip: true  }
      ]
    },
    8: { //Nine
      digit:'9',
      pattern: [
        { x: 0.0, y: 0.0, flip: false },
        { x: 1.0, y: 0.0, flip: false  },
        { x: 0.0, y: 1.0, flip: true  },
        { x: 1.0, y: 1.0, flip: true  },
        { x: 0.0, y: 0.35, flip: false  },
        { x: 1.0, y: 0.35, flip: false  },
        { x: 0.5, y: 0.5, flip: false },
        { x: 1.0, y: 0.65, flip: true },
        { x: 0.0, y: 0.65, flip: true }
      ]
    },
    9: { //Ten
      digit:'10',
      pattern: [
        { x: 0.0, y: 0.0, flip: false },
        { x: 1.0, y: 0.0, flip: false  },
        { x: 0.0, y: 1.0, flip: true  },
        { x: 1.0, y: 1.0, flip: true  },
        { x: 0.0, y: 0.35, flip: false  },
        { x: 1.0, y: 0.35, flip: false  },
        { x: 0.5, y: 0.25, flip: false },
        { x: 1.0, y: 0.65, flip: true },
        { x: 0.0, y: 0.65, flip: true },
        { x: 0.5, y: 0.75, flip: true },
      ]
    },
    10: {//Eleven
      digit:'11',
      pattern: [
        { x: 0.5, y: 0.0, flip: false },
        { x: 0.5, y: 0.5, flip: false  },
        { x: 0.5, y: 1.0, flip: true  }
      ]
    },
    11: {//Twelve
      digit:'12',
      pattern: [
        { x: 0.5, y: 0.0, flip: false },
        { x: 0.5, y: 0.5, flip: false  },
        { x: 0.5, y: 1.0, flip: true  }
      ]
    },
    12: {//Thirteen
      digit:'13',
      pattern: [
        { x: 0.5, y: 0.0, flip: false },
        { x: 0.5, y: 0.5, flip: false  },
        { x: 0.5, y: 1.0, flip: true  }
      ]
    },
    13: {//Fourteen
      digit:'14',
      pattern: [
        { x: 0.5, y: 0.0, flip: false },
        { x: 0.5, y: 0.5, flip: false  },
        { x: 0.5, y: 1.0, flip: true  }
      ]
    }
  };

  const SUITS = [ 'diamond', 'heart', 'spade', 'club' ];

  // Defining a class
  class Card {
    // here we need something to instantiate a single card

    /* @paul define class constructor, and decide how internal instance variables should be
       structured and defined. Also, define structure of methods that will act upon each instance
    */

    // Define a generic card and its functionality here
    constructor(value) {
      this.value = value;
      //this.suit;
      this.ownerID = 0;
    }

    setOwner(player) {
      this.ownerID = player.id;
    }
  }

  Card.CARDS = CARDS;
  Card.SUITS = SUITS;

  // Defining and returning a simple object
  // With a single key: Card
  return {
    Card
  };
});
