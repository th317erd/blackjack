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
    var currentPlayer = this.getCurrentPlayer();
    // get the player who git the action
    var actionPlayer = this.getPlayerByID(action.playerID);
    var playerAction = action.name;
    // double check to make sure the players exist
    if (!actionPlayer || !currentPlayer)
      return false

    // compair the player who initiated the action to the player who is the current player
    if (actionPlayer.id === currentPlayer) {
      // return true if the players are the same
      if (playerAction === 'hit') {
        // do something
      } else if (playerAction === 'split')  {
        // do something else
      }
      // check to see which action the user has clicked on, should be within the actionPlayer array of values
      // under name there should be the list of actions accomplished by user
      // all last value assigned
      // if it is action hit make sure the user has not exceeded the 21 card limit or the max ammout of hits a user can do

      console.log("this returned true the current player and the player ids match up");
      return true;
    } else {
      // return false if the players are not the same
      console.log("this is not the current player");
      return false;
    }
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
