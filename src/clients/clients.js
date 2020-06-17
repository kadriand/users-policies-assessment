// @flow

import {Client} from '../models/client';
import clientsDataSource from '../../data/5808862710000087232b75ac.json';
import {ServiceError} from "../utils/errors";

const clients: Client[] = clientsDataSource.clients;

/**
 * Get all clients.
 *
 * @returns {Promise}
 */
export const fetchAll: Client[] = () => {
    return new Promise((resolve, reject) => {
        if (clientsDataSource)
            resolve(clientsDataSource);
        else
            reject(new ServiceError({msg: 'clients query failed'}));
    });
};

/**
 * Get a client.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export const getClient: Client = (id) => {
    return new Promise((resolve, reject) => {
        const clientFound = clients.filter((client: Client) => client.id === id);
        if (clientFound.length)
            resolve(clientFound[0]);
        else
            reject(new ServiceError({msg: 'client not found', code: 404}));
    });

};

/**
 * Find clients matching the query.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export const findClients: Client[] = (query) => {
    const {field, value} = query;
    return new Promise((resolve, reject) => {
        const clientFound = clients.filter((client: Client) => client[field] === value);
        resolve(clientFound);
    });

};

