let should = require('chai').should();

let sinon = require('sinon');

let YoutubePlayer = require('../src/client/YoutubePlayer');

describe('Youtube Class', function() {
    let sut;

    beforeEach(function() {
        sut = new YoutubePlayer();
    });

    it('should be an object', function() {
        sut.should.be.an('object');
    });

    it('should have properties player and done', function() {
        sut.should.have.property('done');
        sut.should.have.property('player');
    });

    describe('onYouTubeIframeAPIReady', function() {
        it('should create a player', () => {
            let iframeAPI = { Player: sinon.stub() };
            sut.onYouTubeIframeAPIReady(iframeAPI);
            sut.player.should.exist;
            sinon.assert.called(iframeAPI.Player);
        });

        it('should throw an error if no API is passed in', function() {
            sut.onYouTubeIframeAPIReady.bind(sut)
            .should.throw('Missing API argument - pass this script https://www.youtube.com/iframe_api as an argument');
        });
    });

    describe('Change video', function() {
        it('should call player.loadVideoById', function() {

            sut.player = {
                loadVideoById: sinon.spy()
            };

            let videoID = 'abc';
            sut.changeVideo(videoID);
            sut.player.loadVideoById.called.should.be.true;

            sut.player.loadVideoById.reset();
        });
    });

    describe('getVideoIDfromURL', function() {
        it('should return videoID from valid urls', function() {
            let url = 'https://www.youtube.com/watch?v=XGQevaXj3tQ';
            sut.getVideoIDfromURL.bind(sut, url)
            .should.not.throw('bad url');
        });

        it('should return error on invalid urls', function() {
            let url = 'bad url';
            sut.getVideoIDfromURL.bind(sut, url)
            .should.throw('bad url');
        });
    });
});
