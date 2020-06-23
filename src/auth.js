// @flow

import type {Client} from "./models/client";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import * as Boom from "@hapi/boom";
import * as jwk from "../resources/jwk.json";

const privateKey = jwkToPem(jwk, {private: true});
const publicKey = jwkToPem(jwk);

/**
 * log in user
 * @param client
 * @param password
 * @returns {Promise<string>}
 */
export const authenticate = (client: Client, password: string) => {
    const hashedPassword = getHashedPassword(password);
    if (client.id === hashedPassword) {
        const authToken = generateJwt(client);
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
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        throw Boom.unauthorized();
    const jwtToken = authHeader.replace(/^Bearer\s/i, "");
    const claims = jwt.verify(jwtToken, publicKey, (error, claims) => {
        if (error)
            throw Boom.forbidden(error.message);
        else if (roles.includes(claims.scope))
            next();
        else
            throw Boom.forbidden('you cannot access this resource');
    });

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
const generateJwt = (client: Client) => {
    return jwt.sign({clientId: client.id, scope: client.role}, privateKey, {algorithm: 'RS256', expiresIn: '10m'});
};

