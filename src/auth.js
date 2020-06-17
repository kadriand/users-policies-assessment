// @flow

import * as clientsService from './services/clients';
import type {Client} from "./models/client";
import crypto from "crypto";
import * as Boom from "@hapi/boom";

/**
 *  This will hold the users and authToken related to users
 */
const authTokens = {};

/**
 * log in user
 * @param client
 * @param password
 * @returns {Promise<string>}
 */
export const authenticate = (client: Client, password: string) => {
    const hashedPassword = getHashedPassword(password);
    if (client.id === hashedPassword) {
        const authToken = generateAuthToken();
        // Store authentication token
        authTokens[authToken] = client.id;
        return Promise.resolve(authToken)
    } else {
        throw Boom.unauthorized('Invalid password');
    }
};

/**
 * Given a list of roles, check if the user holds any of them
 * @param roles
 * @param req
 * @param res
 * @param next
 */
const authorizeRole = (roles, req, res, next) => {
    const token = req.cookies['AuthToken'];
    const user = authTokens[token];

    if (!user)
        throw Boom.unauthorized();

    clientsService
        .getClientById(user)
        .then((data: Client) => {
            if (roles.includes(data.role))
                next();
            else
                throw Boom.forbidden('you cannot access this resource');
        }).catch(err => next(err));
};

export const requireAuthRole = (roles) => {return (req, res, next) => authorizeRole(roles, req, res, next)};

/**
 * Gets the hashed password, as it should be in DB
 *
 * @param password
 * @returns {*}
 */
const getHashedPassword = (password) => {
    return password;
};

/**
 * Authorization token generation
 *
 * @returns {string}
 */
const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
};

