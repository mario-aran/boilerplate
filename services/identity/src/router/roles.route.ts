import { SEGMENTS } from '@/constants/routes';
import { rolesController } from '@/controllers/roles.controller';
import {
  createRoleSchema,
  getAllRolesSchema,
  roleIdSchema,
  updateRoleSchema,
} from '@/lib/zod/schemas/roles.schema';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const rolesRoute = Router();

rolesRoute.get(
  '/',
  zodValidator({ query: getAllRolesSchema }),
  rolesController.getAll,
);

rolesRoute.get(
  SEGMENTS.ID,
  zodValidator({ params: roleIdSchema }),
  rolesController.get,
);

rolesRoute.post(
  '/',
  zodValidator({ body: createRoleSchema }),
  rolesController.create,
);

rolesRoute.patch(
  SEGMENTS.ID,
  zodValidator({ params: roleIdSchema, body: updateRoleSchema }),
  rolesController.update,
);

rolesRoute.delete(
  SEGMENTS.ID,
  zodValidator({ params: roleIdSchema }),
  rolesController.delete,
);
