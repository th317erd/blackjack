ktExport('card.js', () => {
  
  const cardSuite = {
    spade:{
      pattern: 0,
      color: black
    },
    diamond: {
      pattern: 0,
      color: red
    },
    heart: {
      pattern: 0,
      color: red
    },
    club: {
      pattern: 0,
      color: black
    }
  }

  const cardValue = {
    // value should be 0 - 11
    // random value from that array = itself
    one: {
      value: 1,
      name: one
    },
    two: {
      value: 2,
      name: two
    },
    three: {
      value: 3,
      name: three
    },
    four: {
      value: 4,
      name: four
    },
    five: {
      value: 5,
      name: five
    },
    six: {
      value: 6,
      name: six
    },
    seven: {
      value: 7,
      name: seven
    },
    eight: {
      value: 8,
      name: eight
    },
    nine: {
      value: 9,
      name: nine
    },
    ten: {
      value: 10,
      name: ten
    },
    jack: {
      value: 10,
      name: jack
    },
    queen: {
      value: 10,
      name: queen
    },
    king: {
      value: 10,
      name: king
    },
    ace: {
      value: 11,
      name: ace
    }
  }
  
  class Card {
    // here we need something to instantiate a single card
    /* @paul define class constructor, and decide how internal instance variables should be
       structured and defined. Also, defined structure of methods that will act upon each instance
    */

    // Define a generic card and its functionality here
    constructor(value,suit) {
      // card value
      this.value = value;
      // card suit
      this.suit = suit;
    }
  }
  // Defining and returning a simple object
  // With a single key: Card
  return {
    Card
  };
});
