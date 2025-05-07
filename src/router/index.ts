import { openAPIDocumentV1 } from '@/lib/zod-to-openapi/openapi-documents';
import { handleNotFound } from '@/middleware/handle-not-found';
import { handleRouteError } from '@/middleware/handle-route-error';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { authRoute } from './v1/auth.route';
import { permissionsRoute } from './v1/permissions.route';
import { userRolesRoute } from './v1/user-roles.route';
import { usersRoute } from './v1/users.route';

// Constants
const API_V1_PATH = '/api/v1';

// Router
const router = Router();
router.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(openAPIDocumentV1));

// API routes
router.use(`${API_V1_PATH}/auth`, authRoute);
router.use(`${API_V1_PATH}/users`, usersRoute);
router.use(`${API_V1_PATH}/user-roles`, userRolesRoute);
router.use(`${API_V1_PATH}/permissions`, permissionsRoute);

router.get('/', (_, res) => {
  res.json({ message: 'Service is up and running' });
});

// Middleware
router.use(handleNotFound); // Must be placed after all routes
router.use(handleRouteError); // Must be the last middleware

export { router };
