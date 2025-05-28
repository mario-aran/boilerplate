import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { ROUTES_V1 } from './constants/routes';
import swaggerDocumentV1 from './lib/swagger/swagger-document-v1.json';
import { handleNotFound } from './middleware/handle-not-found';
import { handleRouteError } from './middleware/handle-route-error';
import { authRoute } from './routes/v1/auth.route';
import { permissionsRoute } from './routes/v1/permissions.route';
import { userRolesRoute } from './routes/v1/user-roles.route';
import { usersRoute } from './routes/v1/users.route';

export const router = Router();

// "swagger-ui-express"
router.use(
  ROUTES_V1.API_DOCS,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentV1),
);

// API routes
router.use(ROUTES_V1.AUTH, authRoute);
router.use(ROUTES_V1.PERMISSIONS, permissionsRoute);
router.use(ROUTES_V1.USER_ROLES, userRolesRoute);
router.use(ROUTES_V1.USERS, usersRoute);

router.get('/', (_, res) => {
  res.json({ message: 'Service is up and running' });
});

// API middleware
router.use(handleNotFound); // Must be placed after all routes
router.use(handleRouteError); // Must be the last middleware
