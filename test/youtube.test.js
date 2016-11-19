let should = require('chai').should();
let sut = require('../src/client/js/Youtube');

describe('Youtube Class', function() {
    let actual;

    beforeEach(function() {
        actual = new sut();
    });

    it('should be an object', function() {
        actual.should.be.an('object');
    });
});
