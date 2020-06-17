import {expect} from 'chai';
import request from 'supertest';
import * as sinon from "sinon";
import * as auth from "../src/auth";

describe('Base API Test', () => {
    before(() => {
        sinon.stub(auth, 'requireAuthRole').callsFake((roles) => {return (req, res, next) => next()});
    });

    it('should return API version and title for the app', done => {
        const app = require('../src/index').default;

        request(app)
            .get('/api')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.app).to.be.equal(app.locals.title);
                expect(res.body.apiVersion).to.be.equal(app.locals.version);

                done();
            });
    });

    it('should return 405 method not allowed for random API hits', done => {
        const app = require('../src/index').default;

        const randomString = Math.random()
            .toString(36)
            .substr(2, 5);

        request(app)
            .get(`/api/${randomString}`)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(405);
                expect(res.body.error.code).to.be.equal(405);
                expect(res.body.error.message).to.be.equal('Method Not Allowed');

                done();
            });
    });

    after(function () {
        auth.requireAuthRole.restore(); // Unwraps the spy
    });
});
