let should = require('chai').should();
let request = require('superagent');

describe('express web server', function() {
    //let server = require('../server');
    let port = 3000;
    let baseUrl = 'http://localhost:' + port;

    it('GET / should respond with Hello', function(done) {
        request(baseUrl)
        .timeout(1900)
        .end(function(err, res) {
            should.not.exist(err);
            res.status.should.be.equal(200);
            res.text.should.equal('Hello');
            done();
        })
    });
});
