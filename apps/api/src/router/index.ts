import { swaggerSpecV1 } from '@/lib/swagger/swagger-spec-v1';
import { handleNotFound } from '@/middleware/handle-not-found';
import { handleRouteError } from '@/middleware/handle-route-error';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { authRoute } from './api-routes/auth.route';
import { homeRoute } from './api-routes/home-route';
import { userRolesRoute } from './api-routes/user-roles.route';
import { usersRoute } from './api-routes/users.route';

const API_V1_PATH = '/api/v1';
const API_DOCS_V1_PATH = '/api-docs/v1';

const router = Router();

// API
router.use(`${API_V1_PATH}/auth`, authRoute);
router.use(`${API_V1_PATH}/users`, usersRoute);
router.use(`${API_V1_PATH}/user-roles`, userRolesRoute);
router.use(API_V1_PATH, homeRoute);

// Swagger
router.use(API_DOCS_V1_PATH, swaggerUi.serve, swaggerUi.setup(swaggerSpecV1));

// Health check
router.get('/', (_req, res) => {
  res.json({ message: 'Service is up and running' });
});

// Middleware
router.use(handleNotFound); // Must be placed after all routes
router.use(handleRouteError); // Must be the last middleware

export { router };
