// @flow

import * as clientsService from '../services/clients';
import {authenticate} from '../auth';
import type {Client} from "../models/client";
import * as Boom from "@hapi/boom";

/**
 * login user by email and password. The default password is the client id
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const login = (req, res, next) => {
    const {email, password} = req.body;
    clientsService.findClients({field: "email", value: email})
        .then((clients: Client[]) => {
                if (clients.length)
                    return clients[0];
                throw  Boom.notFound('Client not found');
            }
        )
        .then(client => authenticate(client, password))
        .then(authToken => {
                res.json({accessToken: authToken})
            }
        )
        .catch(err => next(err));
};