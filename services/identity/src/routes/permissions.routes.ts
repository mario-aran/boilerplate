import { PermissionsController } from '@/controllers/permissions.controller';
import { getAllPermissionsSchema } from '@/lib/zod/schemas/permissions.schema';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const createPermissionsRoutes = (
  permissionsController: PermissionsController,
) => {
  const router = Router();

  router.get(
    '/',
    zodValidator({ query: getAllPermissionsSchema }),
    permissionsController.getAll.bind(permissionsController),
  );

  return router;
};
