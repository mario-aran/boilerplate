import { RolesService } from '@/features/roles/roles.service';
import { RoleId } from '@/lib/zod/schemas/roles.schema';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { controllerCatchAsync } from './utils';

export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await this.rolesService.getAll(req.query);
    res.json(results);
  });

  get = controllerCatchAsync(async (req: Request<RoleId>, res: Response) => {
    const result = await this.rolesService.get(req.params.id);
    res.json(result);
  });

  create = controllerCatchAsync(async (req: Request, res: Response) => {
    const { id } = await this.rolesService.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: `Role ${id} created successfully` });
  });

  update = controllerCatchAsync(async (req: Request<RoleId>, res: Response) => {
    const { id } = await this.rolesService.update(req.params.id, req.body);
    res.json({ message: `Role ${id} updated successfully` });
  });

  delete = controllerCatchAsync(async (req: Request<RoleId>, res: Response) => {
    const { id } = await this.rolesService.delete(req.params.id);
    res.json({ message: `Role ${id} deleted successfully` });
  });
}
