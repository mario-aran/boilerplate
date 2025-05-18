import { PERMISSIONS } from '@/constants/permissions';
import { permissionsController } from '@/controllers/v1/permissions.controller';
import { getAllPermissionsSchema } from '@/lib/zod/schemas/v1/permissions.schema';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { Router } from 'express';

export const permissionsRoute = Router();

// Route definitions
permissionsRoute.get(
  '/',
  authenticateWithPermission(PERMISSIONS.READ_PERMISSIONS),
  validateWithZod({ query: getAllPermissionsSchema }),
  permissionsController.getAll,
);
