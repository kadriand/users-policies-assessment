// @flow

import * as clientsService from '../services/clients';
import * as policiesService from '../services/policies';
import type {Client} from "../models/client";
import type {Policy} from "../models/policy";
import * as Boom from "@hapi/boom";

/**
 * Get all clients.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchAll = (req, res, next) => {
    clientsService
        .getAllClients()
        .then(data => res.json({data}))
        .catch(err => next(err));
};

/**
 * Get a client by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const getClient = async (req, res, next) => {
    try {
        const {id} = req.params;
        const policy: Policy = await policiesService.getPolicyById(id);
        const client: Client = await clientsService.getClientById(policy.clientId);
        return res.json({data: client});
    } catch (error) {
        next(error)
    }
};

/**
 * Get a client by its name.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchByClient = async (req, res, next) => {
    try {
        const {field, value} = req.query;

        const clients: Client[] = await clientsService.findClients({field, value});
        if (!clients.length)
            throw  Boom.notFound('Client not found');
        const clientId = clients[0].id;

        const policies: Policy[] = await policiesService.findPolicies({field: "clientId", value: clientId});
        if (!policies.length)
            throw  Boom.notFound('No policy found');
        return res.json({data: policies});
    } catch (error) {
        next(error)
    }
};
