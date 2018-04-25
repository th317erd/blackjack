ktExport('card.js', () => {
  //create class of Cards
  class Card {
    //assign getters and setters within the class for the number suit and entire deck
    constructor(number, suit, deck) {
      //define the number
      this.number = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];
      //define the suit
      this.suit = ["Hearts", "Dimonds", "Clubs", "Spades"];
      //define the deck
      this.deck = [52];
      //create new object of a builtDeck which is empty
      var builtDeck = new Object();
    }

    //define counter_one and counter_two for the exterior and interior loops
    var counter_one, counter_two;
    //itterate though all the cards
    for (counter_one = 0; counter_one < Card.deck[0]; counter_one++ ) {
      //itterate though all the suits
      for (counter_two = 0; counter_two < Card.suit.length; counter_two++ ) {
        // assign suit to a card.number
        // push those new formed cards into the builtDeck in key value pairs
      }
    }
  }

  //log new key value pairs to the console
  return {
    Card
  };
});
