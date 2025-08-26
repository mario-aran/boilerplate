import { BASE_URL } from '@/config/env';
import { SEGMENTS } from '@/constants/routes';
import { swaggerDocument } from '@/lib/swagger/swagger-document';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import { authRoutes } from './routes/auth.routes';
import { permissionsRoutes } from './routes/permissions.routes';
import { rolesRoutes } from './routes/roles.routes';

export const router = Router();

// "swagger-ui-express"
router.use(SEGMENTS.DOCS, swaggerUi.serve);
router.get(SEGMENTS.DOCS, swaggerUi.setup(swaggerDocument));

// Favicon handler
router.get(SEGMENTS.FAVICON, (_, res) =>
  res.status(StatusCodes.NO_CONTENT).end(),
);

// Routes
router.get('/', (_, res) =>
  res.json({
    message: 'Identity service',
    version: '1.0',
    docs: `${BASE_URL}${SEGMENTS.DOCS}`,
  }),
);

router.use(SEGMENTS.AUTH, authRoutes);
router.use(SEGMENTS.ROLES, rolesRoutes);
router.use(SEGMENTS.PERMISSIONS, permissionsRoutes);
