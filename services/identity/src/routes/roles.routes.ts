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
  roleIdSchema,
  updateRoleSchema,
} from '@/lib/zod/schemas/roles.schema';
import { authenticateAndAuthorize } from '@/middleware/authenticate-and-authorize';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const rolesRoutes = Router();

// ---------------------------
// ROUTES: /roles
// ---------------------------

rolesRoutes.get(
  '/',
  authenticateAndAuthorize(PERMISSIONS.READ_ROLES),
  zodValidator({ query: getRolesSchema }),
  getRoles,
);

rolesRoutes.post(
  '/',
  authenticateAndAuthorize(PERMISSIONS.CREATE_ROLE),
  zodValidator({ body: createRoleSchema }),
  createRole,
);

// ---------------------------
// ROUTES: /roles/:id
// ---------------------------

rolesRoutes.get(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.READ_ROLE),
  zodValidator({ params: roleIdSchema }),
  getRole,
);

rolesRoutes.patch(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.UPDATE_ROLE),
  zodValidator({ params: roleIdSchema, body: updateRoleSchema }),
  updateRole,
);

rolesRoutes.delete(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.DELETE_ROLE),
  zodValidator({ params: roleIdSchema }),
  deleteRole,
);
