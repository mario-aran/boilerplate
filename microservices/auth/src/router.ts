import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { ROUTES_V1 } from './constants/routes';
import { swaggerDocumentV1 } from './lib/swagger/swagger-documents';
import { globalErrorHandler } from './middleware/global-error-handler';
import { notFoundHandler } from './middleware/not-found-handler';
import { authRoute } from './routes/v1/auth.route';
import { permissionsRoute } from './routes/v1/permissions.route';
import { userRolesRoute } from './routes/v1/user-roles.route';
import { usersRoute } from './routes/v1/users.route';

export const router = Router();

// Health check
router.get('/', (_, res) => {
  res.json({ message: 'Service is up and running' });
});

// Api routes
router.use(ROUTES_V1.AUTH, authRoute);
router.use(ROUTES_V1.PERMISSIONS, permissionsRoute);
router.use(ROUTES_V1.USER_ROLES, userRolesRoute);
router.use(ROUTES_V1.USERS, usersRoute);

// "swagger-ui-express" routes
router.use(
  ROUTES_V1.API_DOCS,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentV1),
);

// API middleware
router.use(notFoundHandler); // Must be placed after all routes
router.use(globalErrorHandler); // Must be the last middleware
