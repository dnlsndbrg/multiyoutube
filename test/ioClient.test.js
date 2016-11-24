'use strict';

let sinon = require('sinon');
let IoClient = require('../src/client/IoClient');
let should = require('chai').should;
should();

describe('socket.io client', function() {

    before(function() {
        this.sut = new IoClient('url');
    });

    it('should start connection', function() {
        let io = sinon.spy();
        this.sut.connect(io);
        io.called.should.be.true;
        io.reset();
    });
});
