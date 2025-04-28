import { PERMISSIONS } from '@/constants/permissions';
import { permissionsController } from '@/features/permissions/permissions.controller';
import { readAllPermissionsZod } from '@/lib/zod/schemas/permissions.zod';
import { authenticateJwt } from '@/middleware/authenticate-jwt';
import { checkPermission } from '@/middleware/check-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

const router = Router();
router.use(authenticateJwt); // Apply JWT to all subsequent routes

// Route definitions
router.get(
  '/',
  checkPermission(PERMISSIONS.READ_PERMISSIONS),
  validateWithZod({ query: readAllPermissionsZod }),
  routeCatchAsync(permissionsController.readAll),
);

export { router as permissionsRoute };
