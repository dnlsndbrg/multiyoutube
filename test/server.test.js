let should = require('chai').should();
let request = require('supertest');

describe('express web server', function() {
    let server;

    beforeEach(function () {
        server = require('../src/server/server');
    });
    afterEach(function () {
        server.close();
    });

    it('GET / should respond with Hello', function(done) {
        request(server)
        .get('/')
        .end(function(err, res) {
            should.not.exist(err);
            res.status.should.equal(200);
            res.text.should.equal('Hello');
            done();
        })
    });
});
