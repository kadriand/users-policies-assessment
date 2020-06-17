import {expect} from 'chai';
import request from 'supertest';
import * as auth from '../../src/auth';
import * as policies from '../../src/clients/policies';
import * as sinon from "sinon";
import * as Boom from "@hapi/boom";
import * as clients from "../../src/clients/clients";

/**
 * Tests for '/api/users'
 */
describe('Get a client test', () => {

    let app;

    before(() => {
        sinon.stub(auth, 'requireAuthRole').callsFake((roles) => {return (req, res, next) => next()});
        app = require('../../src/index').default;
    });

    it('should return the client of a policy', done => {
        sinon.stub(policies, 'getPolicy').returns(Promise.resolve({id: "some-id", clientId: "some-client-id"}));
        sinon.stub(clients, 'getClient').returns(Promise.resolve({id: "some-client-id", role: "admin"}));

        request(app)
            .get('/api/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b/client')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property("id");
                expect(res.body.data).to.have.include({"id": "some-client-id"});
                policies.getPolicy.restore();
                clients.getClient.restore();
                done();
            });
    });

    it('should return not found', done => {
        sinon.stub(policies, 'getPolicy').callsFake(() => {throw Boom.notFound('Client not found')});
        request(app)
            .get('/api/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b/client')
            .end((err, res) => {
                expect(res.status).to.be.equal(404);
                policies.getPolicy.restore();
                done();
            });
    });

    it('should search for policies', done => {
        sinon.stub(clients, "findClients").returns(Promise.resolve([{id: "some-client-id", role: "admin"}]));
        sinon.stub(policies, "findPolicies").returns(Promise.resolve([{id: "some-id", clientId: "some-client-id"}]));
        const app = require('../../src/index').default;
        request(app)
            .get('/api/policies/search/client')
            .query({field: 'name', value: 'SomeGuy'})
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.have.property("id");
                expect(res.body.data[0]).to.have.include({"clientId": "some-client-id"});
                clients.findClients.restore();
                policies.findPolicies.restore();
                done();
            });
    });

    it('should return bad request', done => {
        const app = require('../../src/index').default;
        request(app)
            .get('/api/policies/search/client')
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
