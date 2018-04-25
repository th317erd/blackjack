ktExport('card.js', () => {
  /*
    @chuck define pattern structure for suit render patterns
    Recomendation: ratios from 0.0 - 1.0 would enable patterns
    to be properly applied to cards of any size
  */

  const SUITS = {
    0: {
      pattern: [
        { x: 0.0, y: 0.0 }
      ]
    },
    1: {
      pattern: [
        { x: 0.0, y: 0.0 },
        { x: 1.0, y: 1.0 }
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
