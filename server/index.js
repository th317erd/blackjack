const http = require('http'),
      SocketIO = require('socket.io'),
      { BlackJackGame } = require('../client/games/blackjack'),
      { Player } = require('../client/player.js');

const PORT = 8085;

var app = http.createServer(function(request, response){}),
    io = SocketIO(app),
    game = new BlackJackGame();

// connection event
io.on('connection', function (client) {
  console.log('User connected!');

  client.once('disconnect', function() {
    console.log('User disconnected!');
    game.removePlayer(player);
  });

  var player = game.createNewPlayer();

  client.on('chat_message', function(data) {
    try {
      client.broadcast.emit('chat_message', data);
      // new player just joined game
    } catch (e) {
      console.error(e);
    }
  });

  client.on('action', function(action) {
    try {
      console.log(`Received action from client [${player.id}]:`, action);
      game.dispatchAction(action);
      // new player just joined game
    } catch (e) {
      console.error(e);
    }
  });

  var clientData = Object.assign({}, game, {
    clientPlayerID: player.id
  });

  console.log('SERVER', JSON.stringify(clientData, undefined, 2));
  client.emit( 'connection', clientData);
});

app.listen(PORT);


