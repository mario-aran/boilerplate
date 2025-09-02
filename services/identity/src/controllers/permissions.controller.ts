import { PermissionsService } from '@/features/permissions/permissions.service';
import { Request, Response } from 'express';
import { controllerCatchAsync } from './utils';

export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await this.permissionsService.getAll(req.query);
    res.json(results);
  });
}
