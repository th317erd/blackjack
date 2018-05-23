// Include websocket library
const SocketIO = require('socket.io-client');

function initializeWebsocketConnection(host, port) {
  // Attach to the WebSocket
  const socket = SocketIO(`http://${host}:${port}`);
  socket.on('connection', function() {
    console.log('Connected to websocket server!');

    window.sendChat = (user, message) => {
      if (typeof message !== 'string')
        throw new Error('Improper usage. Specify your username as the first argument, message as the second');

      this.emit('chat_message', {
        user,
        message
      });
    };

    this.on('chat_message', (data) => {
      console.info(`${data.user} says: ${data.message}`);
    });

    this.on('disconnect', () => {
      console.info('Client disconnected');
    });
  });
}

module.exports = {
  initializeWebsocketConnection
};
