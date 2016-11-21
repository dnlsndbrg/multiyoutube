let should = require('chai').should();
let YoutubePlayer = require('../src/client/YoutubePlayer');

describe('Youtube Class', () => {
    let sut;

    beforeEach(() => {
        sut = new YoutubePlayer();
    });

    it('should be an object', () => {
        sut.should.be.an('object');
    });
});
