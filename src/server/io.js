let io = require('socket.io');
let port = 3001;

io = io.listen(port);
io.sockets.on('connection', (socket) => {
    socket.emit('echo', {message: 'Hello World'});
});

module.exports = io;
