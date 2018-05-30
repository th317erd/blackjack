const http = require('http');

const PORT = 8085;

var app = http.createServer(function(request, response){}),
    io = require('socket.io')(app);

io.on('connection', function (socket) {
  console.log('User connected!');

  socket.on('chat_message', function(data) {
    try {
      socket.broadcast.emit('chat_message', data);
    } catch (e) {
      console.error(e);
    }
  });

  socket.emit('connection');
});

app.listen(PORT);
