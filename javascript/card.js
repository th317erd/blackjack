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

  const SUITS = {
    0: {
      pattern: [
        { x: 0.0, y: 0.0}
      ]
    },   
    1: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    2: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    3: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    4: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    5: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    6: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    7: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    8: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    9: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    10: {
      pattern: [
        {x: 0.0, y: 0.0}
      ]
    },
    11: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    12: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    13: {
      pattern: [
        { x: 0.0, y: 0.0 }
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
