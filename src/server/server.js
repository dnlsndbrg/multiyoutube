let express = require('express');
let path = require('path');
let http = require('http');
let io = require('socket.io');
let app = express();
let expressPort = 3000;
let socketPort = 3001;

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
    res.send('Hello');
});

let server = http.createServer(app).listen(expressPort, () => {
    console.log('Express is running on port %s', expressPort);
});

io = io.listen(socketPort);
io.sockets.on('connection', function (socket) {
    socket.emit('echo', {message: 'Hello World'});
});

module.exports = {
    server: server,
    io: io
};
