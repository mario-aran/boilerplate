import { BASE_URL } from '@/config/env';
import { SEGMENTS } from '@/constants/routes';
import { swaggerDocument } from '@/lib/swagger/swagger-document';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import { authRoutes } from './auth.routes';
import { permissionsRoutes } from './permissions.routes';
import { rolesRoutes } from './roles.routes';

export const routes = Router();

// Root endpoint
routes.get('/', (_, res) =>
  res.json({
    message: 'Identity service',
    version: '1.0',
    docs: `${BASE_URL}${SEGMENTS.DOCS}`,
  }),
);

// Favicon handler
routes.get('/favicon.ico', (_, res) =>
  res.status(StatusCodes.NO_CONTENT).end(),
);

// Swagger UI
routes.use('/docs', swaggerUi.serve);
routes.get('/docs', swaggerUi.setup(swaggerDocument));

// API routes
routes.use(SEGMENTS.AUTH, authRoutes);
routes.use(SEGMENTS.ROLES, rolesRoutes);
routes.use(SEGMENTS.PERMISSIONS, permissionsRoutes);
