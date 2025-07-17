import { ROUTES_V1 } from '@/constants/routes';
import { swaggerDocumentV1 } from '@/lib/swagger/swagger-documents';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { authRoute } from './auth.route';
import { permissionsRoute } from './permissions.route';
import { userRolesRoute } from './user-roles.route';
import { usersRoute } from './users.route';

export const routesV1 = Router();

// "swagger-ui-express"
routesV1.use(
  ROUTES_V1.API_DOCS,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentV1),
);

routesV1.use(ROUTES_V1.AUTH, authRoute);
routesV1.use(ROUTES_V1.PERMISSIONS, permissionsRoute);
routesV1.use(ROUTES_V1.USER_ROLES, userRolesRoute);
routesV1.use(ROUTES_V1.USERS, usersRoute);
