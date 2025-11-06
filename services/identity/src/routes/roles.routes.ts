import { PATH_SEGMENTS } from '@/constants/paths';
import { PERMISSIONS } from '@/constants/permissions';
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from '@/controllers/roles.controller';
import {
  createRoleSchema,
  getRolesSchema,
  rolesParamsSchema,
  updateRoleSchema,
} from '@/lib/zod/schemas/roles.schema';
import { authenticateAndAuthorize } from '@/middleware/authenticate-and-authorize';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const rolesRoutes = Router();

rolesRoutes.get(
  '/',
  authenticateAndAuthorize(PERMISSIONS.READ_ROLES),
  zodValidator({ query: getRolesSchema }),
  getRoles,
);

rolesRoutes.get(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.READ_ROLE),
  zodValidator({ params: rolesParamsSchema }),
  getRole,
);

rolesRoutes.post(
  '/',
  authenticateAndAuthorize(PERMISSIONS.CREATE_ROLE),
  zodValidator({ body: createRoleSchema }),
  createRole,
);

rolesRoutes.patch(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.UPDATE_ROLE),
  zodValidator({ params: rolesParamsSchema, body: updateRoleSchema }),
  updateRole,
);

rolesRoutes.delete(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.DELETE_ROLE),
  zodValidator({ params: rolesParamsSchema }),
  deleteRole,
);
