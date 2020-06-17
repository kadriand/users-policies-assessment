import {check} from 'express-validator';

export const login = [check("email").notEmpty(), check("password").notEmpty()];
