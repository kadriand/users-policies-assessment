import {expect} from 'chai';
import request from 'supertest';
import * as auth from '../../src/auth';
import * as clients from '../../src/clients/clients';
import * as sinon from "sinon";
import * as Boom from "@hapi/boom";

/**
 * Tests for '/api/users'
 */
describe('Get a client test', () => {

    let app;

    before(() => {
        sinon.stub(auth, 'requireAuthRole').callsFake((roles) => {return (req, res, next) => next()});
        app = require('../../src/index').default;
    });

    it('should return a client', done => {
        sinon.stub(clients, 'getClient').returns(Promise.resolve({id: "some-id", role: "admin"}));
        request(app)
            .get('/api/clients/44e44268-dce8-4902-b662-1b34d2c10b8e')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property("id");
                expect(res.body.data).to.have.include({"id": "some-id"});
                clients.getClient.restore();
                done();
            });
    });

    it('should return not found', done => {
        sinon.stub(clients, 'getClient').callsFake(() => {throw Boom.notFound('Client not found')});
        request(app)
            .get('/api/clients/44e44268-dce8-4902-b662-1b34d2c10b8e')
            .end((err, res) => {
                expect(res.status).to.be.equal(404);
                clients.getClient.restore();
                done();
            });
    });

    it('should search for clients', done => {
        sinon.stub(clients, "findClients").returns(Promise.resolve([{id: "some-id", role: "admin"}]));
        request(app)
            .get('/api/clients/search')
            .query({field: 'name', value: 'SomeGuy'})
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.have.property("id");
                expect(res.body.data[0]).to.have.include({"id": "some-id"});
                clients.findClients.restore();
                done();
            });
    });

    it('should return bad request', done => {
        request(app)
            .get('/api/clients/search')
            .query({badfield: 'name', value: 'SomeGuy'})
            .end((err, res) => {
                expect(res.status).to.be.equal(400);
                done();
            });
    });

    after(function () {
        auth.requireAuthRole.restore();
    });

});
