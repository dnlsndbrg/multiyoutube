let express = require('express');
let path = require('path');
let http = require('http');
let app = express();

let server = http.createServer(app);

app.use(express.static(path.join(__dirname, '../../public')));

module.exports = server;
