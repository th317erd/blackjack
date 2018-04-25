ktExport('card.js', () => {
  
  const CARDSUIT = {
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

  const CARDVALUE = {
    // value should be 0 - 12
    // random value from that array = itself
    two: {
      value: 2
    },
    three: {
      value: 3
    },
    four: {
      value: 4
    },
    five: {
      value: 5
    },
    six: {
      value: 6
    },
    seven: {
      value: 7
    },
    eight: {
      value: 8
    },
    nine: {
      value: 9
    },
    ten: {
      value: 10
    },
    jack: {
      value: 10
    },
    queen: {
      value: 10
    },
    king: {
      value: 10
    },
    ace: {
      value: 11,
      altValue: 1
    }
  }
  
  class Card {
    static SUIT = CARDSUIT;

    // Define a generic card and its functionality here
    constructor() {
      // needs a value
      cardValue = 0;
      
      // needs a suit
      cardSuit = 0;
          // suit needs a shape (spade, diamond, heart, club)

          // suit needs a text color (black or red)

      // needs an owner (player)

      // needs an html structure?
    }

  }

  return {
    Card
  };
});
