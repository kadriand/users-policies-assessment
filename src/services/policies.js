// @flow

import * as Boom from '@hapi/boom';
import * as policiesClient from '../clients/policies';
import type {Policy} from "../models/policy";


/**
 * Get all policies.
 *
 * @returns {Promise}
 */
export const getAllPolicies: Policy[] = () => {
    return policiesClient.fetchAll();
};

/**
 * Get a policy.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export const getPolicyById: Policy = (id) => {
    return policiesClient.getPolicy(id)
        .then(policy => policy)
        .catch(error => {
            throw Boom.notFound('Policy not found');
        });
};

/**
 * Search the policiess by field name and value.
 *
 * @param   {object}  params
 * @returns {Promise}
 */
export const findPolicies: Policy[] = (params) => {
    return policiesClient.findPolicies(params)
        .then(policy => policy);
};

