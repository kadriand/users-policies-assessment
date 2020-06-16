// @flow

import * as clientsService from '../services/clientsService';

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
export const fetchById = (req, res, next) => {
    const {id} = req.params;
    clientsService
        .getClientById(id)
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
export const fetchByField = (req, res, next) => {
    // const validation = validationResult(req);
    // console.log(validation);
    const {field, value} = req.query;
    clientsService
        .findClients({field, value})
        .then(data => res.json({data}))
        .catch(err => next(err));
};
