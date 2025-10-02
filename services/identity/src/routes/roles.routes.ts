import { PATH_SEGMENTS } from '@/constants/paths';
import { PERMISSIONS } from '@/constants/permissions';
import { rolesController } from '@/controllers/roles.controller';
import {
  createRoleSchema,
  getAllRolesSchema,
  roleIdSchema,
  updateRoleSchema,
} from '@/lib/zod/schemas/roles.schema';
import { authenticateAndAuthorize } from '@/middleware/authenticate-and-authorize';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const rolesRoutes = Router();

rolesRoutes.get(
  '/',
  authenticateAndAuthorize(PERMISSIONS.READ_ROLES),
  zodValidator({ query: getAllRolesSchema }),
  rolesController.getAll.bind(rolesController),
);

rolesRoutes.get(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.READ_ROLE),
  zodValidator({ params: roleIdSchema }),
  rolesController.get.bind(rolesController),
);

rolesRoutes.post(
  '/',
  authenticateAndAuthorize(PERMISSIONS.CREATE_ROLE),
  zodValidator({ body: createRoleSchema }),
  rolesController.create.bind(rolesController),
);

rolesRoutes.patch(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.UPDATE_ROLE),
  zodValidator({ params: roleIdSchema, body: updateRoleSchema }),
  rolesController.update.bind(rolesController),
);

rolesRoutes.delete(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.DELETE_ROLE),
  zodValidator({ params: roleIdSchema }),
  rolesController.delete.bind(rolesController),
);
