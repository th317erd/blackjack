const { Game } = require('../game');

class BlackJackGame extends Game {
  constructor() {
    super();
    this.deck = this.generateDeck();
  }

  // Here we will define blackjack specific game stuff
  /* @team discuss how this will tie into, and define a game and its rules */
  checkPlayIsValid(action) {
    // rules for if a play is valid
  }

  /* @mason define action methods */
  actionHit() {
    var player = this.getCurrentPlayer(),
        card = this.getRandomCard();

    this.assignCardToPlayer(player, card);
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
