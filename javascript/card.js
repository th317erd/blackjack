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
  const SUITS = {
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
    3: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    },
    4: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    },
    5: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    },
    6: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    },
    7: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    },
    8: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    },
    9: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    },
    10: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    },
    11: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    },
    12: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    },
    13: {
      pattern: [
        { x: 0.0, y: 0.0, flip: false }
      ]
    }
  };

  // Defining a class
  class Card {
    // here we need something to instantiate a single card
    /* @paul define class constructor, and decide how internal instance variables should be
       structured and defined. Also, defined structure of methods that will act upon each instance
    */
  }

  Card.SUITS = SUITS;

  // Defining and returning a simple object
  // With a single key: Card
  return {
    Card
  };
});
