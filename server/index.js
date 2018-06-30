const http = require('http');

const PORT = 8085;

var app = http.createServer(function(request, response){}),
    io = require('socket.io')(app);

// connection event
io.on('connection', function (client) {
  console.log('User connected!');
  // give user client ID
  

  client.on('chat_message', function(data) {
    try {
      client.broadcast.emit('chat_message', data);
      // new player just joined game
    } catch (e) {
      console.error(e);
    }
  });

  client.emit('connection', {playerID : 1});
});

app.listen(PORT);
