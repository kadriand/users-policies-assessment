import {Router} from 'express';

import * as clientController from '../controllers/policies';
import * as validators from "../validators/policies";
import {validateRequest} from "../validators/commons";
import {requireAuthRole} from "../auth";

const router = Router();

/**
 * GET /api/clients
 */
router.get('/', clientController.fetchAll);

/**
 * GET /api/clients/:id
 */
router.get('/search/client', validators.findByClient, validateRequest, requireAuthRole(["admin"]), clientController.fetchByClient);

/**
 * GET /api/clients/:id
 */
router.get('/:id/client', requireAuthRole(["admin"]), clientController.getClient);

export default router;
