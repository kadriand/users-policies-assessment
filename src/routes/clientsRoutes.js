import {Router} from 'express';

import * as clientController from '../controllers/clients';
import * as validators from "../validators/clients";
import {validateRequest} from "../validators/commons";

const router = Router();

/**
 * GET /api/clients
 */
router.get('/', clientController.fetchAll);

/**
 * GET /api/clients/:id
 */
router.get('/search', validators.findClient, validateRequest, clientController.fetchByField);

/**
 * GET /api/clients/:id
 */
router.get('/:id', clientController.fetchById);

export default router;
