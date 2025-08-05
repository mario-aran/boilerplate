import { BASE_URL } from '@/config/env';
import { ROUTES } from '@/constants/routes';
import { swaggerDocument } from '@/lib/swagger/swagger-document';
import { notFound } from '@/middleware/not-found';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { authRoute } from './auth.route';
import { permissionsRoute } from './permissions.route';
import { rolesRoute } from './roles.route';

export const router = Router();

// Root routes
router.get('/', (_, res) => res.json({ message: 'Service is up and running' }));

// "swagger-ui-express" routes
router.use(ROUTES.API_DOCS, swaggerUi.serve);
router.get(ROUTES.API_DOCS, swaggerUi.setup(swaggerDocument));

// API routes
router.get(ROUTES.API, (_, res) =>
  res.json({
    message: 'Identity service',
    version: '1.0',
    docs: `${BASE_URL}${ROUTES.API_DOCS}`,
  }),
);

router.use(ROUTES.AUTH, authRoute);
router.use(ROUTES.ROLES, rolesRoute);
router.use(ROUTES.PERMISSIONS, permissionsRoute);

// Middlewares: must be placed after all routes
router.use(notFound);
