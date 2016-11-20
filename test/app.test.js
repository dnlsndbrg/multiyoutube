let request = require('supertest');
let app = require('./../src/server/app');

describe('Express web server', () => {

    it('Returns status code 200', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('Should return HTML', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /html/, done);
    });

    it('Serves static content', (done) => {
        request(app)
            .get('/css/stylesheet.css')
            .expect('Content-Type', /css/, done);
    });

});
