import { permissionsService } from '@/features/permissions/permissions.service';
import { GetPermissions } from '@/lib/zod/schemas/permissions.schema';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

export const getPermissions = controllerCatchAsync(
  async (
    req: Request<unknown, unknown, unknown, GetPermissions>,
    res: Response,
  ) => {
    const result = await permissionsService.getAll(req.query);
    res.json(result);
  },
);
