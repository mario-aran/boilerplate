import { permissionsService } from '@/features/permissions/permissions.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

export const getPermissions = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const result = await permissionsService.getAll(req.query);
    res.json(result);
  },
);
