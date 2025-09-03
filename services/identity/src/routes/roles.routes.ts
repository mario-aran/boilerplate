import { PATH_SEGMENTS } from '@/constants/paths';
import { RolesController } from '@/controllers/roles.controller';
import {
  createRoleSchema,
  getAllRolesSchema,
  roleIdSchema,
  updateRoleSchema,
} from '@/lib/zod/schemas/roles.schema';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const rolesRoutes = (rolesController: RolesController) => {
  const router = Router();

  router.get(
    '/',
    zodValidator({ query: getAllRolesSchema }),
    rolesController.getAll.bind(rolesController),
  );

  router.get(
    PATH_SEGMENTS.ID,
    zodValidator({ params: roleIdSchema }),
    rolesController.get.bind(rolesController),
  );

  router.post(
    '/',
    zodValidator({ body: createRoleSchema }),
    rolesController.create.bind(rolesController),
  );

  router.patch(
    PATH_SEGMENTS.ID,
    zodValidator({ params: roleIdSchema, body: updateRoleSchema }),
    rolesController.update.bind(rolesController),
  );

  router.delete(
    PATH_SEGMENTS.ID,
    zodValidator({ params: roleIdSchema }),
    rolesController.delete.bind(rolesController),
  );

  return router;
};
