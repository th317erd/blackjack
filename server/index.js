global.nextTick = (...args) => process.nextTick(...args);

const http = require('http'),
      SocketIO = require('socket.io'),
      { BlackJackGame } = require('../games/blackjack'),
      { Player } = require('../common/player.js');

const PORT = 8085,
      // Set high for development, should be smaller (5000) in production
      HEARTBEAT_TIMEOUT = 60000;

var app = http.createServer(function(request, response){}),
    io = SocketIO(app, { 'pingTimeout': HEARTBEAT_TIMEOUT, 'pingInterval': HEARTBEAT_TIMEOUT * 5 }),
    game = new BlackJackGame({ connection: io });

global.game = game;

// connection event
io.on('connection', function (client) {
  console.log('User connected!');

  client.once('disconnect', function() {
    console.log('User disconnected!');
    game.removePlayer(player);
  });

  var player = game.addPlayer();

  client.on('chat_message', function(data) {
    try {
      client.broadcast.emit('chat_message', data);
      // new player just joined game
    } catch (e) {
      console.error(e);
    }
  });

  client.on('action', function(_action) {
    var action = Object.assign({},_action || {}, {playerID:player.id});
    console.log(action);
    try {
      console.log(`Received action from client [${player.id}]:`, action);
      game.recieveAction(action);
      // new player just joined game
    } catch (e) {
      console.error(e);
    } finally{

    };
  });

  var clientData = Object.assign({}, game, {
    clientPlayerID: player.id
  });

  console.log('SERVER', JSON.stringify(clientData, undefined, 2));
  client.emit( 'connection', clientData);
});

app.listen(PORT);


