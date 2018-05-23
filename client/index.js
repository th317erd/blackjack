      // Include websocket connector
const { initializeWebsocketConnection } = require('./websockets'),
      // Include game classes
      { BlackJackGame } = require('./games/blackjack'),
      { Card } = require('./card'),
      { renderCard } = require('./debug-utils'),
      dust = require('dustjs'),
      testTemplate = require('./templates/card');

(function() {
//   initializeWebsocketConnection('localhost', 8085);

  console.log('KingTut: ', BlackJackGame); 
  global.game = new BlackJackGame();
  
  dust.render(testTemplate, Object.assign({
    'suit': 'spade',
    'suit-font': 'font-suits1'
  }, Card.CARDS[9]), function(err, output) {
    console.log('TEMPLATE OUTPUT: ', output);
  });

  // First argument is type, can be one of:
  // diamond, heart, club, or spade
  renderCard('spade', Card.CARDS[9]);

  // Empty exports (don't export anything)
  // An empty object is needed
  // Because "nothing" (undefined)
  // would throw an exception
  return {};
})();
