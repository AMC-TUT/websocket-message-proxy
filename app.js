
var io = require('socket.io')(8081);

var clientCount = 0,
  coins = [];

io.on('connection', function(socket) {
  /* connected event broadcast all existing clients that there is a new client connected with a socket.id */
  socket.broadcast.emit('connected', socket.id);
  clientCount++;

  /* disconnected event broadcast all existing clients that the client with the socket.id has disconnected */
  socket.on('disconnect', function() {
    socket.broadcast.emit('disconnected', socket.id);
    clientCount--;
  });

  /* message event is all-around message with an object that can include whatever relevant. clients must know how to handle these messages. */
  socket.on('msg', function(data) {
    if(data.action === 'coins') coins = data.coins;

    // send (broadcast) message to all other clients
    socket.broadcast.emit('msg', socket.id, data);
  });

  socket.on('clientCount', function (fn) {
    fn({ clientCount: clientCount });
  });

  socket.on('getCoins', function (fn) {
    fn({ coins: coins });
  });
});