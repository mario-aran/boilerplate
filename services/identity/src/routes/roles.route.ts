import { SEGMENTS } from '@/constants/routes';
import { rolesController } from '@/controllers/roles.controller';
import {
  createRoleSchema,
  getAllRolesSchema,
  roleIdSchema,
  updateRoleSchema,
} from '@/lib/zod/schemas/roles.schema';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { Router } from 'express';

export const rolesRoute = Router();

rolesRoute.get(
  '/',
  validateWithZod({ query: getAllRolesSchema }),
  rolesController.getAll,
);

rolesRoute.get(
  SEGMENTS.ID,
  validateWithZod({ params: roleIdSchema }),
  rolesController.get,
);

rolesRoute.post(
  '/',
  validateWithZod({ body: createRoleSchema }),
  rolesController.create,
);

rolesRoute.patch(
  SEGMENTS.ID,
  validateWithZod({ params: roleIdSchema, body: updateRoleSchema }),
  rolesController.update,
);

rolesRoute.delete(
  SEGMENTS.ID,
  validateWithZod({ params: roleIdSchema }),
  rolesController.delete,
);
