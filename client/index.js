// We need to require dust first since it sets and uses a global
const dust = global.dust = require('dustjs'),
      dustHelpers = require('dustjs-helpers');

      // Include websocket connector
const { initializeWebsocketConnection } = require('./websockets'),
      // Include game classes
      { BlackJackGame } = require('./games/blackjack'),
      { Card } = require('./card'),
      { renderCard } = require('./debug-utils');

(function() {
//   initializeWebsocketConnection('localhost', 8085);

  console.log('KingTut: ', BlackJackGame);
  global.game = new BlackJackGame();

  // First argument is type, can be one of:
  // diamond, heart, club, or spade
  renderCard(0, 'spade');

  // Empty exports (don't export anything)
  // An empty object is needed
  // Because "nothing" (undefined)
  // would throw an exception
  return {};
})();
