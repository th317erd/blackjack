const { Game } = require('../../common/game'),
      { Player } = require('../../common/player'),
      boardTemplate = (global.PLATFORM === 'browser') ? require('./templates/board') : null;

class BlackJackGame extends Game {
  constructor(...args) {
    super(...args);
  }

  addPlayer() {
    var player = super.addPlayer();
    this.addRandomCardToHand(player, { visible: true });
    this.addRandomCardToHand(player, { visible: 'all' });
    return player;
  }

  checkPlayIsValid(action) {
    //get the current player
    var currentPlayerID = this.getCurrentPlayerID();
    // get the player who git the action
    var actionPlayer = this.getPlayerByID(action.playerID);
    var actionName = action.name;

    // compair the player who initiated the action to the player who is the current player
    if (!actionPlayer || !currentPlayerID){
      console.log('player doesnt exist', actionPlayer); 
      return false
    }
      

    if (actionPlayer.id !== currentPlayerID)
      // return false if the players are not the same
      console.log('Its not your turn', actionPlayer); 
      return false;

    if (actionName === 'hit') {
      // If the players current hand value is less then 21,
      // then they are allowed to take a hit
      //return (this.getHandValue(actionPlayer) < 21);
      //console.log('BUST');

    } else if (actionName === 'split' ) {

    }
  }

  getCardValue(card) {
    var values = {
      '0' : 11, // ace
      '1' : 2,
      '2' : 3,
      '3' : 4,
      '4' : 5,
      '5' : 6,
      '6' : 7,
      '7' : 8,
      '8' : 9,
      '9' : 10,
      '10' : 10, // jack
      '11' : 10, // queen
      '12' : 10 // king
    };
    return values[card.value];
  }

  getHandValue(player) {
    // make sure player is valid
    if (!player)
      return 0;

    var playerHand = player.hand;

    // make sure hand is valid
    if (!playerHand)
      return 0;

    //for each card in players hand, take the value and add it to the "score"
    var sortedHand = playerHand.slice().sort((a, b) => {
      var x = this.getCardValue(a),
          y = this.getCardValue(b);

      return (x == y) ? 0 : (x < y) ? -1 : 1;
    });
    // get the sum of the players cards
    var handTotal = sortedHand.reduce((sum, card) => {
      var value = this.getCardValue(card);
      if(value > 10 && (sum + value) > 21)
        value = 1;

        return sum + value;

    }, 0 );

    return handTotal;
  }
  actionHit(action) {
    var actionPlayer = this.getPlayerByID(action.playerID),
        addRandomCard = this.addRandomCardToHand(actionPlayer, { visible: 'all' } );
    
    if(actionPlayer != this.currentPlayerID)
      console.log('Its not your turn', actionPlayer); 

    if(this.getHandValue(actionPlayer) < 21){
      console.log('hit');
      console.log('total', this.getHandValue(actionPlayer));
      return addRandomCard;
    } else if (this.getHandValue(actionPlayer) === 21){
      console.log('BLACKJACK');
      //end turn
    } else {
      console.log('BUSTED');
      //end turn
    }

    console.log('total', this.getHandValue(actionPlayer));

  }

  // Split

  // Double Down

  //Stand
  actionStand() {
    var actionPlayerID = action.playerID,
        allPlayers = this.players;

    if ( !allPlayers || !allPlayers.length )
      return;

    allPlayers.sort((a,b)=>{
      var x = a.id,
          y = b.id;

      if( x == y ){
        return 0;
      }
      return (x > y) ? 1 : -1;
    });

    var currentPlayerIndex = allPlayers.findIndex((player)=>(player.id === actionPlayerID));
    if (currentPlayerIndex < 0)
      return;

    var nextPlayerIndex = (currentPlayerIndex + 1)%allPlayers.length;

    this.setPlayerTurn(allPlayers[nextPlayerIndex]);

  }

  //Split
  actionSplit () {
    /*
    If you have two cards of the same denomination, you can split your cards into two hands and play
    each hand separately. Your original bet will be duplicated for the new hand. Note: according to Atlantic
    City Blackjack rules, you may only draw one additional card on each ace when splitting a pair of aces.
    Also note that this option will normally only be available immediately after you receive your first two cards.
    */
    console.log("this is a action split");
  }
  //Double
  actionDouble () {
    /*
    If you select this option, you will get exactly one more card, your turn will end, and your bet will be
    doubled. Note: this option will normally only be available immediately after you receive your first two
    cards, however, Doubling after Splitting is usually allowed.
    */
  }

  actionInsurance () {
    /*
    Whenever the dealer's up-card is an ace, the player has an option of purchasing insurance. If the player
    believes that the value of the dealer's down-card is a 10, purchasing insurance places a side bet of half
    the original wager. If the dealer's down-card does indeed have a value of 10, the player is immediately
    paid 2-to-1 on the insurance bet. The original wager is lost unless the player also ties with his or her
    own Blackjack. Basically, insurance is just a bet that the dealer's unseen card has a value of 10.
    */
  }

  checkWhoTurnItIs() {
    var player = this.getCurrentPlayer()
    if (!player) {
      return
    }
  }

  /* @chuck calculate if there is a winner
      iterate cards/players as needed
      sum up if there is a winner
  */
  calculateGameState() {
  }

  // shuffleCards() {
  //   var getCards = generateDeck();
  // }

  async render() {
    var R = this.renderer;
    if (!R)
      return;

    await R.render(async () => {
      return await R.renderTemplate(boardTemplate, game);
    });

    return await super.render();
  }
}

module.exports = {
  BlackJackGame
};
