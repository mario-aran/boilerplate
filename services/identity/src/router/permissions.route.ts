import { PERMISSIONS } from '@/constants/permissions';
import { permissionsController } from '@/controllers/permissions.controller';
import { getAllPermissionsSchema } from '@/lib/zod/schemas/permissions.schema';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { Router } from 'express';

export const permissionsRoute = Router();

permissionsRoute.get(
  '/',
  authenticateWithPermission(PERMISSIONS.READ_PERMISSIONS),
  validateWithZod({ query: getAllPermissionsSchema }),
  permissionsController.getAll,
);
