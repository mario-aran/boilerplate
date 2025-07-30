import { permissionsService } from '@/features/permissions/permissions.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

class PermissionsController {
  public getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await permissionsService.getAll(req.query);
    res.json(results);
  });
}

export const permissionsController = new PermissionsController();
