// @flow

import * as Boom from '@hapi/boom';
import * as clientsClient from '../clients/clients';
import type {Client} from "../models/client";


/**
 * Get all clients.
 *
 * @returns {Promise}
 */
export const getAllClients: Client[] = () => {
    return clientsClient.fetchAll();
};

/**
 * Get a client.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export const getClientById: Client[] = (id) => {
    return clientsClient.getClient(id)
        .then(client => client[0])
        .catch(error => {
            throw Boom.notFound('Client not found');
        });
};

/**
 * Search the clients by field name and value.
 *
 * @param   {object}  params
 * @returns {Promise}
 */
export const findClients: Client[] = (params) => {
    return clientsClient.findClients(params)
        .then(client => client);
};

