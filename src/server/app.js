let express = require('express');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, '../../public')));

module.exports = app;
