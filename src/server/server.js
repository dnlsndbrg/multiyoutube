let express = require('express');
let path = require('path');
let app = express();
let port = 3000;

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
    res.send('Hello');
});

let server = app.listen(port, function () {
    console.log('Express server listening at port %s', port);
});

module.exports = server;
