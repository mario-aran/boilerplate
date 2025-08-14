import { rolesService } from '@/features/roles/roles.service';
import { RoleId } from '@/lib/zod/schemas/roles.schema';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { controllerCatchAsync } from './utils/controller-catch-async';

class RolesController {
  getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await rolesService.getAll(req.query);
    res.json(results);
  });

  get = controllerCatchAsync(async (req: Request<RoleId>, res: Response) => {
    const result = await rolesService.get(req.params.id);
    res.json(result);
  });

  create = controllerCatchAsync(async (req: Request, res: Response) => {
    const { id } = await rolesService.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: `Role ${id} created successfully` });
  });

  update = controllerCatchAsync(async (req: Request<RoleId>, res: Response) => {
    const { id } = await rolesService.update(req.params.id, req.body);
    res.json({ message: `Role ${id} updated successfully` });
  });

  delete = controllerCatchAsync(async (req: Request<RoleId>, res: Response) => {
    const { id } = await rolesService.delete(req.params.id);
    res.json({ message: `Role ${id} deleted successfully` });
  });
}

export const rolesController = new RolesController();
