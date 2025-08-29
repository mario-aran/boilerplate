import { BASE_URL } from '@/config/env';
import { PARTS } from '@/constants/routes';
import { swaggerDocument } from '@/lib/swagger/swagger-document';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import { authRoutes } from './auth.routes';
import { permissionsRoutes } from './permissions.routes';
import { rolesRoutes } from './roles.routes';

// Constants
const DOCS_PATH = '/docs';
const FAVICON_PATH = '/favicon.ico';

export const routes = Router();

// Favicon handler
routes.get(FAVICON_PATH, (_, res) => res.status(StatusCodes.NO_CONTENT).end());

// Swagger UI
routes.use(DOCS_PATH, swaggerUi.serve);
routes.get(DOCS_PATH, swaggerUi.setup(swaggerDocument));

// Root endpoints
routes.get('/', (_, res) =>
  res.json({
    message: 'Identity service',
    version: '1.0',
    docs: `${BASE_URL}${DOCS_PATH}`,
  }),
);

// API endpoints
routes.use(PARTS.AUTH, authRoutes);
routes.use(PARTS.ROLES, rolesRoutes);
routes.use(PARTS.PERMISSIONS, permissionsRoutes);
