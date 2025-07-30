import { permissionsController } from '@/controllers/permissions.controller';
import { getAllPermissionsSchema } from '@/lib/zod/schemas/permissions.schema';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { Router } from 'express';

export const permissionsRoute = Router();

permissionsRoute.get(
  '/',
  validateWithZod({ query: getAllPermissionsSchema }),
  permissionsController.getAll,
);
