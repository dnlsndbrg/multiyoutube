let ioClient = require('socket.io-client');
let http = require('http');
let ioTestPort = 3001;
let should = require('chai').should;
should();

describe('socket io', function () {
    let ioServer;
    let options ={
        transports: ['websocket'],
        'force new connection': true
    };

    before(function (done) {
        let httpServer = http.createServer();
        httpServer.listen(ioTestPort);
        ioServer = require('../src/server/io').start(httpServer);
        done();
    });

    after(function() {
        ioServer.close();
    });

    it('connects', function (done) {
        let client = ioClient.connect('http://localhost:' + ioTestPort, options);
        client.once('connect', function () {
            client.disconnect();
            done();
        });
    });
});



//     it('echoes messages', function (done) {
//         //let client = ioClient.connect('http://localhost:3000', options);
//
//         client.once('connect', function () {
//             client.once('echo', function (data) {
//                 data.message.should.equal('Hello World');
//
//                 client.disconnect();
//                 done();
//             });
//
//             client.emit('echo', 'Hello World');
//         });
//     });
//
// });
