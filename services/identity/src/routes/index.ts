import { API_GATEWAY_URL } from '@/config/env';
import { PATH_SEGMENTS } from '@/constants/paths';
import { swaggerDocument } from '@/lib/swagger/swagger-document';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import { authRoutes } from './auth.routes';
import { permissionsRoutes } from './permissions.routes';
import { rolesRoutes } from './roles.routes';
import { usersRoutes } from './users.route';

// ---------------------------
// CONSTANTS
// ---------------------------

const FAVICON_PATH = '/favicon.ico';
const DOCS_PATH = '/docs';

// ---------------------------
// ROUTER
// ---------------------------

export const routes = Router();

// ---------------------------
// FAVICON ROUTES
// ---------------------------

routes.get(FAVICON_PATH, (_, res) => res.sendStatus(StatusCodes.NO_CONTENT));

// ---------------------------
// SWAGGER UI ROUTES
// ---------------------------

routes.use(DOCS_PATH, swaggerUi.serve);
routes.get(DOCS_PATH, swaggerUi.setup(swaggerDocument));

// ---------------------------
// ROOT ROUTES
// ---------------------------

routes.get('/', (_, res) =>
  res.json({
    message: 'Identity service',
    version: '1.0',
    docs: `${API_GATEWAY_URL}${DOCS_PATH}`,
  }),
);

// ---------------------------
// API ROUTES
// ---------------------------

routes.use(PATH_SEGMENTS.AUTH, authRoutes);
routes.use(PATH_SEGMENTS.USERS, usersRoutes);
routes.use(PATH_SEGMENTS.ROLES, rolesRoutes);
routes.use(PATH_SEGMENTS.PERMISSIONS, permissionsRoutes);
