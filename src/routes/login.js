import {Router} from 'express';

import * as authController from '../controllers/login';
import * as validators from "../validators/login";
import {validateRequest} from "../validators/commons";

const router = Router();

/**
 * GET /api/clients
 */
router.post('/', validators.login, validateRequest, authController.login);

export default router;
