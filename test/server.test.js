let should = require('chai').should();
let request = require('supertest');

describe('express web server', function() {
    let server;

    before(function () {
        server = require('../src/server/server');
    });
    after(function () {
        server.close();
    });

    describe('GET /', function() {
        it('should respond with index.html', function(done) {
            request(server)
            .get('/')
            .end(function(err, res) {
                should.not.exist(err);
                res.status.should.equal(200);
                res.type.should.equal('text/html');
                done();
            });
        });

        it('should contain a div with id player', function(done) {
            request(server)
            .get('/')
            .end(function(err, res) {
                res.text.should.match(/id='player'/);
                done();
            });
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
