// @flow

import * as Boom from '@hapi/boom';
import * as clientsClient from '../clients/clientsClient';


/**
 * Get all clients.
 *
 * @returns {Promise}
 */
export const getAllClients = () => {
    return clientsClient.fetchAll();
}

/**
 * Get a client.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export const getClientById = (id) => {
    return clientsClient.getClient(id)
        .then(client => client)
        .catch(error => {
            throw Boom.notFound('Client not found');
        });
}

/**
 * Search the clients by field name and value.
 *
 * @param   {Number|String}  params
 * @returns {Promise}
 */
export const findClients = (params) => {
    return clientsClient.findClients(params)
        .then(client => client)
        .catch(error => {
            throw Boom.notFound('Client not found');
        });
};

