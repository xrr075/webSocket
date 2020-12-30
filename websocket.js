const { Sockets } = require('./sockets');

const sockets = Sockets.getInstance();

module.exports = {
  initSocketIoServer(app) {
    const server = require('http').createServer(app.callback());
    const options = { /* ... */ };
    const io = require('socket.io')(server, options);
    io.of('/guide').on('connection', socket => {
      socket.emit('msg', 'connection success');
      sockets.add(socket);
      socket.on('disconnect', () => {
        sockets.del(socket);
      })
    });
    return server;
  }
}