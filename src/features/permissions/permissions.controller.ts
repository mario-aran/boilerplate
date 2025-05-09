import { ReadAllPermissionsZod } from '@/lib/zod/schemas/v1/permissions.zod';
import { Request, Response } from 'express';
import { permissionsService } from './permissions.service';

class PermissionsController {
  public async readAll(
    req: Request<unknown, unknown, unknown, ReadAllPermissionsZod>,
    res: Response,
  ) {
    const results = await permissionsService.readAll(req.query);
    res.json(results);
  }
}

export const permissionsController = new PermissionsController();
