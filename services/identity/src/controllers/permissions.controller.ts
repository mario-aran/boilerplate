import { permissionsService } from '@/features/permissions/permissions.service';
import { Request, Response } from 'express';
import { controllerCatchAsync } from './utils';

class PermissionsController {
  getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await permissionsService.getAll(req.query);
    res.json(results);
  });
}

export const permissionsController = new PermissionsController();
