// We need to require dust first since it sets and uses a global
if (typeof global.nextTick === 'undefined')
  global.nextTick = (callback) => setTimeout(callback, 0);

const dust = global.dust = require('dustjs-linkedin'),
      dustHelpers = require('dustjs-helpers'),
      extraDustHelpers = require('./custom-dust-helpers'),
      SocketIO = require('socket.io-client'),
      { DOMRenderer } = require('./dom-renderer'),
      { BlackJackGame } = require('../games/blackjack'),
      { Player } = require('../common/player'),
      { Card } = require('../common/card');

const HEARTBEAT_TIMEOUT = 60000;

(function() {
  function initializeWebsocketConnection(host, port) {
    // Attach to the WebSocket
    const socket = SocketIO(`http://${host}:${port}`, {
            timeout: HEARTBEAT_TIMEOUT
          }),
          self = this;

    socket.on('connection', function(gameData) {
      console.log('Connected to websocket server!', gameData);
      if (typeof global.game !== 'undefined')
        global.game.destroy();

      var game = global.game = new BlackJackGame(gameData);

      game.setRenderer( new DOMRenderer(game, { rootElementID: 'root' }))
          .setConnection(this)
          .render();
    });
  }
  initializeWebsocketConnection('localhost', 8085);

  // global.BlackJackGame = BlackJackGame;

  // var game = global.game = new BlackJackGame(),
  //     player = global.player = game.addPlayer();

  // game.store.op(({ dispatch, actions }) => dispatch(actions.updatePlayers([player])))
})();
