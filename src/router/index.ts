import { ROUTES_V1 } from '@/constants/routes';
import { openAPIDocumentV1 } from '@/lib/zod/openapi/openapi-documents';
import { handleNotFound } from '@/middleware/handle-not-found';
import { handleRouteError } from '@/middleware/handle-route-error';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { authRoute } from './v1/auth.route';
import { permissionsRoute } from './v1/permissions.route';
import { userRolesRoute } from './v1/user-roles.route';
import { usersRoute } from './v1/users.route';

export const router = Router();

// "swagger-ui-express"
router.use(
  ROUTES_V1.API_DOCS,
  swaggerUi.serve,
  swaggerUi.setup(openAPIDocumentV1),
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
