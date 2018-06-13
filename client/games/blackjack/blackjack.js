const { Game } = require('../../game'),
      { Player } = require('../../player'),
      boardTemplate = require('./templates/board');

class BlackJackGame extends Game {
  constructor(...args) {
    super(...args);

    this.cards = this.generateDeck();
    this.addPlayer(new Player(this));
  }

  // Here we will define blackjack specific game stuff
  /* @team discuss how this will tie into, and define a game and its rules */
  /* @mason define action methods */
  checkPlayIsValid(action) {
    //get the current player
    var currentPlayerId = this.getCurrentPlayerId();
    // get the player who git the action
    var actionPlayer = this.getPlayerByID(action.playerID);
    var playerAction = action.name;
    // double check to make sure the players exist
    if (!actionPlayer || !currentPlayerId)
      return false

    // compair the player who initiated the action to the player who is the current player
    if (actionPlayer.id !== currentPlayerId) {
      // return false if the players are not the same
      return false;
    }

    if (playerAction === 'hit' || playerAction === 'split' || playerAction === 'handvalue') {
      return true;
      // // do something
      // var runAction = actionHit();
      // // runAction
      // // console.log(this is true);
      // console.log(runAction);
    }
  }

  actionHit() {
    // assing random card to current player
    var currentPlayerId = this.getCurrentPlayerId();
    var getPlayerById = this.getPlayerByID(currentPlayerId);
    // console.log(getPlayerById);
    var addRandomCard = this.addRandomCardToHand(getPlayerById);
    return addRandomCard;

    // console.log(addRandomCard);
    // console.log("this was fired");
  }

  getCardValue(card){
    var values = {
      '0' : 11, // aceTT
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
    values[card.value];
    return card.value;
  }

  getHandValue(player) {

    //var playerHand = this.getCardsMatchingOwnerId( this.getCurrentPlayer() );
    //var handValue = playerHand.forEach(this.getCardValue());

    var currentPlayerID = this.getCurrentPlayer();
    console.log('currentplayer:' + currentPlayerID);
    
    // var currentPlayerID = this.currentPlayer.id ; 
    // console.log('currentplayerID:' + currentPlayerID);
    
    var playerHand = this.getCardsMatchingOwnerId(currentPlayerID);
    //var playerHand = this.getPlayerHand(currentPlayerID);
    //console.log('currentplayerhand:' + playerHand);
    return playerHand

    //for each card in players hand, take the value and add it to the "score"
    var sortedHand = playerHand.slice().sort((a, b) => {
      var x = getCardValue(a),
          y = getCardValue(b);
      
      return (x == y) ? 0 : (x < y) ? -1 : 1;
    });

    var handTotal = sortedHand.reduce((sum, card) => {
      var value = getCardValue(card);
      if(value > 10 && (sum + value) > 21)
        value = 1;
      
        return sum + value;

    }, 0 );
    
    return handTotal;
  }

  actionHandvalue() {
    var currentPlayerId = this.getCurrentPlayerId();
    var getPlayerById = this.getPlayerByID(currentPlayerId);

    console.log(getPlayerById);
    console.log(getPlayerById.hand);
    //getPlayerHand( getCurrentPlayer() );
    // get value of each card
    // add values together
    // return score
  }

  // Stand

  // Split

  // Double Down
  //Stand
  actionStand() {
    var player = this.getCurrentPlayer();
    // Request that you receive no more cards. Your current hand will be judged against the dealer's.
    var currentPlayerHand = getPlayerHand(player)
    console.log(currentPlayerHand);
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

  shuffleCards() {
    var getCards = generateDeck();
  }

  async render() {
    var R = this.renderer;
    if (!R)
      return;

    R.render(async () => {
      return R.renderTemplate(boardTemplate, game);
    });
  }
}

module.exports = {
  BlackJackGame
};
