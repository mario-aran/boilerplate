import { userRolesController } from '@/features/user-roles/user-roles.controller';
import {
  createUserRoleZod,
  getAllUserRolesZod,
  updateUserRoleZod,
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
  checkPermission('create_user_role'),
  validateWithZod({ body: createUserRoleZod }),
  routeCatchAsync(userRolesController.create),
);

router.get(
  '/',
  checkPermission('read_user_roles'),
  validateWithZod({ query: getAllUserRolesZod }),
  routeCatchAsync(userRolesController.getAll),
);

router.get(
  ID_PATH,
  checkPermission('read_user_role'),
  routeCatchAsync(userRolesController.get),
);

router.put(
  ID_PATH,
  checkPermission('update_user_role'),
  validateWithZod({ body: updateUserRoleZod }),
  routeCatchAsync(userRolesController.update),
);

router.delete(
  ID_PATH,
  checkPermission('delete_user_role'),
  routeCatchAsync(userRolesController.delete),
);

export { router as userRolesRoute };
