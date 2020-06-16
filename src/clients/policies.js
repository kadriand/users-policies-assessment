// @flow

import {Policy} from '../models/policy';
import policiesDataSource from '../../data/580891a4100000e8242b75c5.json';
import {ServiceError} from "../utils/errors";

const policies: Policy[] = policiesDataSource.policies;

/**
 * Get all policies.
 *
 * @returns {Promise}
 */
export const fetchAll: Policy[] = () => {
    return new Promise((resolve, reject) => {
        if (policiesDataSource)
            resolve(policiesDataSource);
        else
            reject(new ServiceError({msg: 'policies query failed'}));
    });
};

/**
 * Get a policy.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export const getPolicy: Policy = (id) => {
    return new Promise((resolve, reject) => {
        const policyFound = policies.filter((policy: Policy) => policy.id === id);
        if (policyFound.length)
            resolve(policyFound[0]);
        else
            reject(new ServiceError({msg: 'policy not found', code: 404}));
    });

};

/**
 * Find policies matching the query.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export const findPolicies: Policy[] = (query) => {
    const {field, value} = query;
    return new Promise((resolve, reject) => {
        const policyFound = policies.filter((policy: Policy) => policy[field] === value);
            resolve(policyFound);
    });

};

