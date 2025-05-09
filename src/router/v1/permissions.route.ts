import { PERMISSIONS } from '@/constants/permissions';
import { permissionsController } from '@/features/permissions/permissions.controller';
import { ReadAllPermissionsZod } from '@/lib/zod/schemas/v1/permissions.zod';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

// Router
export const permissionsRoute = Router();

// Route definitions
permissionsRoute.get(
  '/',
  authenticateWithPermission(PERMISSIONS.READ_PERMISSIONS),
  validateWithZod({ query: ReadAllPermissionsZod }),
  routeCatchAsync(permissionsController.readAll),
);
