import { HTTP_STATUS } from '@/constants/http-status';
import { swaggerSpecV1 } from '@/lib/swagger/swagger-spec-v1';
import { handleNotFound } from '@/middleware/handle-not-found';
import { handleRouteError } from '@/middleware/handle-route-error';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { authRoute } from './v1/auth.route';
import { permissionsRoute } from './v1/permissions.route';
import { userRolesRoute } from './v1/user-roles.route';
import { usersRoute } from './v1/users.route';

const API_DOCS_V1_PATH = '/api-docs/v1';
const API_V1_PATH = '/api/v1';

const router = Router();

// Swagger
router.use(API_DOCS_V1_PATH, swaggerUi.serve, swaggerUi.setup(swaggerSpecV1));

// API routes
router.use(`${API_V1_PATH}/auth`, authRoute);
router.use(`${API_V1_PATH}/users`, usersRoute);
router.use(`${API_V1_PATH}/user-roles`, userRolesRoute);
router.use(`${API_V1_PATH}/permissions`, permissionsRoute);

router.use(API_V1_PATH, (_req, res) => {
  res.sendStatus(HTTP_STATUS.NO_CONTENT);
});

router.get('/', (_req, res) => {
  res.json({ message: 'Service is up and running' });
});

// Middleware
router.use(handleNotFound); // Must be placed after all routes
router.use(handleRouteError); // Must be the last middleware

export { router };
