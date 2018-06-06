const { Game } = require('../game'),
      { Player } = require('../player');

class BlackJackGame extends Game {
  constructor(...args) {
    super(...args);

    this.cards = this.generateDeck();
    this.addPlayer(new Player());
  }

  // Here we will define blackjack specific game stuff
  /* @team discuss how this will tie into, and define a game and its rules */
  /* @mason define action methods */
  checkPlayIsValid(action) {
    return true;
  }

  actionHit() {
    // set player to current player
    // if player is not a player return
    var player = this.getCurrentPlayer();
    if (!player)
      return;

    // get a random card
    var card = this.getRandomCard();

    // assings a cared to a player
    this.assignCardToPlayer(player, card);
  }

  getHandValue(player) {
    var playerID = this.getCurrentPlayer();
    //get current player ID
    //loop though cards to find matching ownerID

    //var playerHand = this.getPlayerHand( this.getCurrentPlayer() );
    console.log(playerID);

    // get value of each card
    // add values together
    // return score

  }

  // Stand

  // Split

  // Double Down
  checkWhoTurnItIs() {
    var player = this.getCurrentPlayer()
    if (!player) {
      return
    }
  }

  shuffleCards() {
    var getCards = generateDeck();
  }

  /* @chuck calculate if there is a winner
      iterate cards/players as needed
      sum up if there is a winner
  */
  calculateGameState() {
  }

  render() {
    cards.forEach((card) => {
      placeCard();
      defineActions(card);
    });
  }
}

module.exports = {
  BlackJackGame
};
