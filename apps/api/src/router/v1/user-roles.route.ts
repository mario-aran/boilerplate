import { PERMISSIONS } from '@/constants/permissions';
import { userRolesController } from '@/features/user-roles/user-roles.controller';
import {
  createUserRoleZod,
  readAllUserRolesZod,
} from '@/lib/zod/schemas/user-roles.zod';
import { authenticateJwt } from '@/middleware/authenticate-jwt';
import { checkPermission } from '@/middleware/check-permission';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

const ID_PATH = '/:id';

const router = Router();
router.use(authenticateJwt); // Apply JWT to all subsequent routes

// Route definitions
router.post(
  '/',
  checkPermission(PERMISSIONS.CREATE_USER_ROLE),
  validateWithZod({ body: createUserRoleZod }),
  routeCatchAsync(userRolesController.create),
);

router.get(
  '/',
  checkPermission(PERMISSIONS.READ_USER_ROLES),
  validateWithZod({ query: readAllUserRolesZod }),
  routeCatchAsync(userRolesController.readAll),
);

router.get(
  ID_PATH,
  checkPermission(PERMISSIONS.READ_USER_ROLE),
  routeCatchAsync(userRolesController.read),
);

router.delete(
  ID_PATH,
  checkPermission(PERMISSIONS.DELETE_USER_ROLE),
  routeCatchAsync(userRolesController.delete),
);

export { router as userRolesRoute };
