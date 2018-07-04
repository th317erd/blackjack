// We need to require dust first since it sets and uses a global
const dust = global.dust = require('dustjs-linkedin'),
      dustHelpers = require('dustjs-helpers'),
      extraDustHelpers = require('./custom-dust-helpers');

const
      // Include game classes
      { DOMRenderer } = require('./dom-renderer'),
      { BlackJackGame } = require('./games/blackjack'),
      { Player } = require('./player'),
      { Card } = require('./card'),
      { renderCard } = require('./debug-utils');

(function() {

  console.log('KingTut: ', BlackJackGame);
  var game = global.game = new BlackJackGame({
    renderer: new DOMRenderer('root')
  });

  var testPlayers = 5,
      cardsPerHand = 5;

  for (var i = 0; i < testPlayers; i++) {
    var player = new Player(this);
    game.addPlayer(player);

    for (var j = 0; j < cardsPerHand; j++)
      game.addRandomCardToHand(player);
  }

  game.render();
})();
