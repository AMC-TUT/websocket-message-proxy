
var io = require('socket.io')(8081);

io.on('connection', function(socket) {
  /* connected event broadcast all existing clients that there is a new client connected with a socket.id */
  socket.broadcast.emit('connected', socket.id);

  /* disconnected event broadcast all existing clients that the client with the socket.id has disconnected */
  socket.on('disconnect', function() {
    socket.broadcast.emit('disconnected', socket.id);
  });

  /* message event is all-around message with an object that can include what ever relevant. clients must know how to handle these messages. */
  socket.on('msg', function(data) {
    // send (broadcast) message to all other clients
    socket.broadcast.emit('msg', socket.id, data);
  });
});