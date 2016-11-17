let express = require('express');
let server = express();

server.get('/', (req, res) => {
    res.send('Hello');
});

server.listen(3000, function() {
    console.log('express running on port 3000');
});
