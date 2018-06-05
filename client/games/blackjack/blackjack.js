const { Game } = require('../../game'),
      { Player } = require('../../player'),
      boardTemplate = require('./templates/board');

class BlackJackGame extends Game {
  constructor(...args) {
    super(...args);

    this.deck = this.generateDeck();
    this.addPlayer(new Player(this));
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

  //Stand

  //Split

  //Double Down
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
