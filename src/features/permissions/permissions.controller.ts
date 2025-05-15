import { Request, Response } from 'express';
import { permissionsService } from './permissions.service';

class PermissionsController {
  public async getAll(req: Request, res: Response) {
    const results = await permissionsService.getAll(req.query);
    res.json(results);
  }
}

export const permissionsController = new PermissionsController();
