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
    // define an array of availa
    // if ()
    // var currentPlayer = this.getCurrentPlayer();
    // var currentPlayerById = this.getCurrentPlayerById();
    console.log(action);
    return true;
    // var arrayOfActionNames = ['stand', 'hit', 'split', 'double'];
    //
    // for (var i = 0; i < arrayOfActionNames.length; i++) {
    //   if (arrayOfActionNames[i] === action.name) {
    //     console.log('Cool your play is valid!');
    //     return true;
    //   } else {
    //     console.log('Sorry this play is invalid.');
    //   }
    // }
    // return false;
  }

  actionHit() {
    // set player to current player
    // if player is not a player return
    var player = this.getCurrentPlayer();
    // if (!player)
    //   return false;

    // get a random card
    var card = this.getRandomCardFromDeck();

    // assings a cared to a player
    this.assignCardToPlayer(player, card);
  }

  getHandValue() {

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
