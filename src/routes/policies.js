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
 * GET /api/policies/search/client
 */
router.get('/search/client', validators.findByClient, validateRequest, requireAuthRole(["admin"]), clientController.fetchByClient);

/**
 * GET /api/policies/:id/client
 */
router.get('/:id/client', requireAuthRole(["admin"]), clientController.getClient);

export default router;
