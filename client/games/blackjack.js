const { Game } = require('../game'),
      { Player } = require('../player');

class BlackJackGame extends Game {
  constructor() {
    super();
    this.deck = this.generateDeck();
    this.addPlayer(new Player());
  }

  // Here we will define blackjack specific game stuff
  /* @team discuss how this will tie into, and define a game and its rules */
  checkPlayIsValid(action) {
    // rules for if a play is valid
    // if ()
  }

  //some players hand  == total numbers added

  /* @mason define action methods */
  actionHit() {
    var player = this.getCurrentPlayer(),
        card = this.getRandomCard();

    this.assignCardToPlayer(player, card);
  }

  //Stand

  //Split

  //Double Down

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
