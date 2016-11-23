'use strict';

let sinon = require('sinon');
let should = require('chai').should();
let InputField = require('../src/client/InputForm');


describe('Input form for youtube urls', function() {

    before(function() {
        this.jsdom = require('jsdom-global')();
    });

    beforeEach(function() {
        let input = document.createElement('input');
        let button = document.createElement('button');
        this.sut = new InputField(input, button);
    });

    after(function() {
        this.jsdom();
    });

    it('should prevent default submit event', function() {
        let event = {
            type: 'click',
            preventDefault: sinon.spy()
        };
        this.sut.submit(event);
        event.preventDefault.called.should.be.true;
        event.preventDefault.reset();
    });
});
