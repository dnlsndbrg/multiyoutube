let express = require('express');
let app = express();
let port = 3000;

app.get('/', (req, res) => {
    res.send('Hello');
});

let server = app.listen(port, function () {
  console.log('Express server listening at port %s', port);
});

module.exports = server;
