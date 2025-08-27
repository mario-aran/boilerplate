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

export const rolesRoutes = Router();

rolesRoutes.get(
  '/',
  zodValidator({ query: getAllRolesSchema }),
  rolesController.getAll.bind(rolesController),
);

rolesRoutes.get(
  SEGMENTS.ID,
  zodValidator({ params: roleIdSchema }),
  rolesController.get.bind(rolesController),
);

rolesRoutes.post(
  '/',
  zodValidator({ body: createRoleSchema }),
  rolesController.create.bind(rolesController),
);

rolesRoutes.patch(
  SEGMENTS.ID,
  zodValidator({ params: roleIdSchema, body: updateRoleSchema }),
  rolesController.update.bind(rolesController),
);

rolesRoutes.delete(
  SEGMENTS.ID,
  zodValidator({ params: roleIdSchema }),
  rolesController.delete.bind(rolesController),
);
