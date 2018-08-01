// We need to require dust first since it sets and uses a global
const
      { BlackJackGame } = require('./games/blackjack'),
      { Card } = require('./card');

(function() {

  //console.log('KingTut: ', BlackJackGame);
  var game = global.game = new BlackJackGame();

  // game.createNewPlayer();
  // game.createNewPlayer();
  // game.createNewPlayer(); 

  var player = game.createNewPlayer();
  var playerTwo = game.createNewPlayer();
  var playerThree = game.createNewPlayer();

  // for (var i = 0; i < 5; i++)
  //   game.addRandomCardToHand(player);

  // var handValue = game.getHandValue(player);
  // var testCard = player.hand[0]; 

  // var cardVisibilityValue = testCard.isVisibleTo(player);
  // testCard.isVisibleTo(player, true);
  // cardVisibilityValue = testCard.isVisibleTo(player);
  // testCard.isVisibleTo(player, false);
  // cardVisibilityValue = testCard.isVisibleTo(player);

  //game.removePlayer(player);
  // console.log('player1 cards:', game.getCardsMatchingOwnerID(player.id));
  // console.log('all cards:', game.cards);
  // var playersCards = game.getCardsMatchingOwnerID(player.id);
  // var allCards = game.cards;

  // if ( !playersCards >= 0) {  
  //   for (let i=0; i<playersCards.length; i++) {
  //     var playerCard = playersCards[i];
  //     var cardIndex = allCards.indexOf(playerCard);
  //     //cardIndex = game.cards.indexOf(i)
  //     //console.log('card index', cardIndex);
  //     game.cards.splice(cardIndex, 1);
  //   };
  // }
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

        // if (a[1] !== b[1]){
        //   console.log('index 1 was changed')
        // }
        // if (a[2] !== b[2]){
        //   console.log('index 2 was changed')
        // }
        // if (a[3] !== b[3]){
        //   console.log('index 3 was changed')
        // }
      }
      // for (var i=0; i < a.length; i++){
      //   console.log('a:', a[i]);

      // }
      // for (var i=0; i < b.length; i++){
      //   console.log('b:',b[i]);
      // }

    } else {
      return;
    }
  }

})();