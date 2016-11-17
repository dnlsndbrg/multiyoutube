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

    it('should respond with Hello on GET /', function(done) {
        request(server)
        .get('/')
        .end(function(err, res) {
            should.not.exist(err);
            res.status.should.equal(200);
            res.text.should.equal('Hello');
            done();
        });
    });

    it('should serve static content', function(done) {
        request(server)
        .get('/css/stylesheet.css')
        .end(function(err, res) {
            should.not.exist(err);
            res.headers['content-type'].should.equal('text/css; charset=UTF-8');
            done();
        });
    });
});
