import { permissionsController } from '@/controllers/permissions.controller';
import { getAllPermissionsSchema } from '@/lib/zod/schemas/permissions.schema';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const permissionsRoutes = Router();

permissionsRoutes.get(
  '/',
  zodValidator({ query: getAllPermissionsSchema }),
  permissionsController.getAll.bind(permissionsController),
);
