
var io = require('socket.io')(8081);

io.on('connection', function(socket) {
  /* connect event broadcast all existing clients that there is new client connected with socket.id */
  socket.broadcast.emit('connected', socket.id);

  /* disconnection event broadcast all existing clients that client with socket.id disconnected */
  socket.on('disconnect', function() {
    socket.broadcast.emit('disconnected', socket.id);
  });

  /* message event is all around message with object that can include what ever relevant. clients must know how to handle these messages. */
  socket.on('msg', function(data) {
    // send (broadcast) message to all other clients
    socket.broadcast.emit('msg', socket.id, data);
  });
});