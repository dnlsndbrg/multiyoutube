let should = require('chai').should();
let request = require('superagent');

describe('express web server', function() {
    //let server = require('../server');
    let port = 8080;
    let baseUrl = 'http://localhost' + port;


    it('GET / should respond with Hello', function(done) {
        request(baseUrl)
        .end(function(err, res) {
            res.should.have.status(200);
            res.text.should.equal('Hello');
            done();
        })
    });

});
