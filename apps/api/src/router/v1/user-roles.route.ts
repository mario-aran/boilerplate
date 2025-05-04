import { PERMISSIONS } from '@/constants/permissions';
import { userRolesController } from '@/features/user-roles/user-roles.controller';
import { readAllUserRolesZod } from '@/lib/zod/schemas/user-roles.zod';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

const router = Router();

// Route definitions
router.get(
  '/',
  authenticateWithPermission(PERMISSIONS.READ_USER_ROLES),
  validateWithZod({ query: readAllUserRolesZod }),
  routeCatchAsync(userRolesController.readAll),
);

export { router as userRolesRoute };
