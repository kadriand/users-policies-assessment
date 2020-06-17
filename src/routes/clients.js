import {Router} from 'express';

import * as clientController from '../controllers/clients';
import * as validators from "../validators/clients";
import {validateRequest} from "../validators/commons";
import {requireAuthRole} from "../auth";

const router = Router();

/**
 * GET /api/clients
 */
router.get('/', requireAuthRole(["admin"]), clientController.fetchAll);

/**
 * GET /api/clients/:id
 */
router.get('/search', validators.findClient, validateRequest, requireAuthRole(["admin", "user"]), clientController.fetchByField);

/**
 * GET /api/clients/:id
 */
router.get('/:id', requireAuthRole(["admin", "user"]), clientController.fetchById);

export default router;
