import { permissionsService } from '@/services/permissions.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

class PermissionsController {
  public getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const records = await permissionsService.getAll(req.query);
    res.json(records);
  });
}

export const permissionsController = new PermissionsController();
