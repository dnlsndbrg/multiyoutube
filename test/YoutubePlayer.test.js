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

    describe('onYouTubeIframeAPIReady', function() {
        it('should create a player', () => {
            let iframeAPI = { Player: sinon.stub() };
            sinon.spy(iframeAPI);

            sut.onYouTubeIframeAPIReady(iframeAPI);

            sut.player.should.exist;
            sut.player.called.should.be.true;
        });
    });
});
