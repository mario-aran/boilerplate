import { Request, Response } from 'express';
import { permissionsService } from './permissions.service';

class PermissionsController {
  public async readAll(req: Request, res: Response) {
    const results = await permissionsService.readAll(req.query);
    res.json(results);
  }
}

export const permissionsController = new PermissionsController();
