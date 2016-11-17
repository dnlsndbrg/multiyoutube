let should = require('chai').should();
let io = require('socket.io-client');

describe('socket io', function () {
    let server;
    let options ={
        transports: ['websocket'],
        'force new connection': true
    };

    beforeEach(function (done) {
        // start the server
        server = require('../src/server/io');
        done();
    });

    it('echoes messages', function (done) {
        let client = io.connect('http://localhost:3001', options);

        client.once('connect', function () {
            client.once('echo', function (data) {
                data.message.should.equal('Hello World');

                client.disconnect();
                done();
            });

            client.emit('echo', 'Hello World');
        });
    });

});
