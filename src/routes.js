import {Router} from 'express';

import clientsRoutes from './routes/clients';
import policiesRoutes from './routes/policies';
import loginRoutes from './routes/login';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api
 */
router.get('/', (req, res) => {
    res.json({
        app: req.app.locals.title,
        apiVersion: req.app.locals.version
    });
});

router.use('/clients', clientsRoutes);
router.use('/policies', policiesRoutes);
router.use('/login', loginRoutes);

export default router;
