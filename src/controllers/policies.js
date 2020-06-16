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
export const getClient = (req, res, next) => {
    const {id} = req.params;
    policiesService
        .getPolicyById(id)
        .then((policy: Policy) => policy.clientId)
        .then(clientId => clientsService.getClientById(clientId))
        .then(data => res.json({data}))
        .catch(err => next(err));
};

/**
 * Get a client by its name.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchByClient = (req, res, next) => {
    const {field, value} = req.query;
    clientsService
        .findClients({field, value})
        .then((clients: Client[]) => {
                if (clients.length)
                    return clients[0].id;
                throw  Boom.notFound('Client not found');
            }
        )
        .then(clientId => policiesService.findPolicies({field: "clientId", value: clientId}))
        .then(data => res.json({data}))
        .catch(err => next(err));
};
