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
        beforeEach(function() {
            sinon.stub(this.sut, 'getStringFromInput');
            sinon.stub(this.sut, 'getVideoIDfromURL');
        });
        afterEach(function() {
            this.sut.getStringFromInput.restore();
            this.sut.getVideoIDfromURL.restore();
        });

        it('should prevent default submit event', function() {
            let event = {
                type: 'click',
                preventDefault: sinon.spy()
            };
            this.sut.submit(event);
            event.preventDefault.called.should.be.true;
        });

        it('should call changeVideo on the youtube player', function() {
            let event = {
                type: 'click',
                preventDefault: sinon.stub()
            };
            this.sut.submit(event);
            this.sut.youtubePlayer.changeVideo.called.should.be.true;
        });
    });

    describe('getStringFromInput', function() {
        it('should return the text value from the input field', function() {
            this.sut.input.value = 'test';
            let actual = this.sut.getStringFromInput();
            actual.should.equal('test');
        });
    });

    describe('getVideoIDfromURL', function() {
        it('should return videoID from valid urls', function() {
            let url = 'https://www.youtube.com/watch?v=XGQevaXj3tQ';
            this.sut.getVideoIDfromURL.bind(this.sut, url)
            .should.not.throw('bad url');
        });

        it('should return error on invalid urls', function() {
            let url = 'bad url';
            this.sut.getVideoIDfromURL.bind(this.sut, url)
            .should.throw('bad url');
        });
    });
});
