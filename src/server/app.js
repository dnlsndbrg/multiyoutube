let express = require('express');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './../../public/index.html'));
});

module.exports = app;
