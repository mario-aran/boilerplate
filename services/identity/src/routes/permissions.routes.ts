import { PERMISSIONS } from '@/constants/permissions';
import { getPermissions } from '@/controllers/permissions.controller';
import { getAllPermissionsSchema } from '@/lib/zod/schemas/permissions.schema';
import { authenticateAndAuthorize } from '@/middleware/authenticate-and-authorize';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const permissionsRoutes = Router();

permissionsRoutes.get(
  '/',
  authenticateAndAuthorize(PERMISSIONS.READ_PERMISSIONS),
  zodValidator({ query: getAllPermissionsSchema }),
  getPermissions,
);
