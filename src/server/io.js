let io = require('socket.io');

function start(server) {
    io = io(server);

    io.sockets.on('connection', (socket) => {
        console.log('connection');
        socket.emit('echo', {message: 'Hello World'});
    });

    return io;
}

module.exports = {
    start: start
};
