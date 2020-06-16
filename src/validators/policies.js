import {query} from 'express-validator';

export const findByClient = [query("field").notEmpty(), query("value").notEmpty()];

