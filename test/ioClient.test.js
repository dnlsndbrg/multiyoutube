'use strict';

let sinon = require('sinon');
let should = require('chai').should();
let IoClient = require('../src/client/IoClient');

describe('socket.io client', function() {

    before(function() {
        this.sut = new IoClient();
    });

    it('should start connection', function() {
        let io = sinon.spy();
        this.sut.connect(io);
        io.called.should.be.true;
    });
});
