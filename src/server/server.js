let express = require('express');
let path = require('path');
let http = require('http');
let app = express();
let port = 3000;

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
    res.send('Hello');
});

let server = http.createServer(app).listen(port, () => {
    console.log('Express is running on port %s', port);
});

module.exports = {
    server: server
};
