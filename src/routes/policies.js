import {Router} from 'express';

import * as clientController from '../controllers/policies';
import * as validators from "../validators/policies";
import {validateRequest} from "../validators/commons";

const router = Router();

/**
 * GET /api/clients
 */
router.get('/', clientController.fetchAll);

/**
 * GET /api/clients/:id
 */
router.get('/search/client', validators.findByClient, validateRequest, clientController.fetchByClient);

/**
 * GET /api/clients/:id
 */
router.get('/:id/client', clientController.getClient);

export default router;
