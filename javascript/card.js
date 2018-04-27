ktExport('card.js', () => {

  // Defining a class
  class Card {
    // here we need something to instantiate a single card
    
    /* @paul define class constructor, and decide how internal instance variables should be
       structured and defined. Also, define structure of methods that will act upon each instance
    */

    // Define a generic card and its functionality here
    constructor(name,value,suit,facing,color) {

      // card name
      this.name =  Math.floor(Math.random() * 13) + 1;
      // card value
      this.value = value;

      // set card name and value
      if (this.name === 2) {
        this.name = "Two";
        this.value = 2;
      } else if (this.name === 3) {
        this.name = "Three";
        this.value = 3;
      } else if (this.name === 4) {
        this.name = "Four";
        this.value = 4;
      } else if (this.name === 5) {
        this.name = "Five";
        this.value = 5;
      } else if (this.name === 6) {
        this.name = "Six";
        this.value = 6;
      } else if (this.name === 7) {
        this.name = "Seven";
        this.value = 7;
      } else if (this.name === 8) {
        this.name = "Eight";
        this.value = 8;
      } else if (this.name === 9) {
        this.name = "Nine";
        this.value = 9;
      } else if (this.name === 10) {
        this.name = "Ten";
        this.value = 10;
      } else if (this.name === 11) {
        this.name = "Jack";
        this.value = 10;
      } else if (this.name === 12) {
        this.name = "Queen";
        this.value = 10;
      } else if (this.name === 13) {
        this.name = "King"; 
        this.value = 10;
      } else if (this.name === 1) {
        this.name = "Ace";
        this.value = 11;
      }
      
      // card suit
      this.suit = Math.floor(Math.random() * 4) + 1;
      // card color
      this.color = color;

      // set card suit and color
      if (this.suit === 1) {
        this.suit = "Spade";
        this.color = "#000000";
        document.getElementsByClassName("card")[0].setAttribute("class", "card spade"); 
      } else if (this.suit === 2) {
        this.suit = "Diamond";
        this.color = "#ff0000"; 
        document.getElementsByClassName("card")[0].setAttribute("class", "card diamond");
      } else if (this.suit === 3) {
        this.suit = "Heart"; 
        this.color = "#ff0000";
        document.getElementsByClassName("card")[0].setAttribute("class", "card heart");
      } else if (this.suit === 4) {
        this.suit = "Club";
        this.color = "#000000";
        document.getElementsByClassName("card")[0].setAttribute("class", "card club");
      }
 
      // card position
      this.facing = facing;
      var dealerFirstCard = null;
      if (!dealerFirstCard){
        this.facing = "Face up";
      }
    }
  }

  // instantiate the Card class
  const NEWCARD = new Card();
  const CARDONE = new Card();
  const CARDTWO = new Card();

  const HANDVALUE = CARDONE.value + CARDTWO.value;
  const NEWHANDVALUE = HANDVALUE + NEWCARD;
  
  // button interaction
  var dealCards = document.getElementById('dealbutton');
  // on deal button click dealcards
  dealCards.onclick = function(){
    console.log('DEAL!');
    console.log(CARDONE);
    console.log(CARDTWO);
    console.log(HANDVALUE);
  
    document.getElementById('cardOne').innerHTML = CARDONE.name + ' of ' + CARDONE.suit + 's';
    
    document.getElementById('cardTwo').innerHTML = CARDTWO.name + ' of ' +  CARDTWO.suit + 's';

    document.getElementById('pointTotal').innerHTML = ' Score: ' +  HANDVALUE;
  }
  // function dealCards() {
  //   console.log('DEAL!');
  //   console.log(CARDONE);
  //   console.log(CARDTWO);
  //   console.log(HANDVALUE);
  // }
  // dealCards.onclick = dealCards();

  var addCard = document.getElementById('hitbutton');
  addCard.onclick = function() {
    console.log('HIT!');
  }
  var endTurn = document.getElementById('standbutton');
  endTurn.onclick = function() {
    console.log('END TURN!'); 
  }
  
  if(HANDVALUE > 21){
    console.log('BUST!');
  }
  if(HANDVALUE === 21){
    console.log('BLACKJACK!');
    document.getElementById('pointTotal').innerHTML = 'BLACKJACK!';
  }

  function dealCards(){
    document.getElementById('cardOne').innerHTML = new Card();
    document.getElementById('cardTwo').innerHTML = new Card(); 
  }
  
  // Defining and returning a simple object
  // With a single key: Card
  return {
    Card
  };
});
