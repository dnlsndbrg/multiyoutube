'use strict';

let sinon = require('sinon');
let should = require('chai').should();
let InputForm = require('../src/client/InputForm');


describe('Input form for youtube urls', function() {

    before(function() {
        this.jsdom = require('jsdom-global')();
    });

    beforeEach(function() {
        let input = document.createElement('input');
        let button = document.createElement('button');
        let youtubePlayer = { changeVideo: sinon.spy() };
        this.sut = new InputForm(input, button, youtubePlayer);
    });

    after(function() {
        this.jsdom();
    });

    describe('submit', function() {
        it('should prevent default submit event', function() {
            let event = {
                type: 'click',
                preventDefault: sinon.spy()
            };
            this.sut.submit(event);
            event.preventDefault.called.should.be.true;
            event.preventDefault.reset();
        });

        it('should call changeVideo on the youtube player', function() {
            let event = { preventDefault: sinon.stub() };
            this.sut.submit(event);
            this.sut.youtubePlayer.changeVideo.called.should.be.true;
        });
    });
});
