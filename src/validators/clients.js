import {query} from 'express-validator';

export const findClient = [query("field").notEmpty(), query("value").notEmpty()];

