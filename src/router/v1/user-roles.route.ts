import { PERMISSIONS } from '@/constants/permissions';
import { userRolesController } from '@/features/user-roles/user-roles.controller';
import { ReadAllUserRolesZod } from '@/lib/zod/schemas/v1/user-roles.zod';
import { authenticateWithPermission } from '@/middleware/authenticate-with-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

// Router
export const userRolesRoute = Router();

// Route definitions
userRolesRoute.get(
  '/',
  authenticateWithPermission(PERMISSIONS.READ_USER_ROLES),
  validateWithZod({ query: ReadAllUserRolesZod }),
  routeCatchAsync(userRolesController.readAll),
);
