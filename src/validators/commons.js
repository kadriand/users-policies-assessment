import {validationResult} from "express-validator";
import * as Boom from "@hapi/boom";

export const validateRequest = (req, res, next) => {
    const validation = validationResult(req);
    if (validation.isEmpty())
        return next();
    else
        throw Boom.badRequest(null, validation.errors);
};