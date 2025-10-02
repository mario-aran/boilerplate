import { rolesService } from '@/features/roles/roles.service';
import { RoleId } from '@/lib/zod/schemas/roles.schema';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { controllerCatchAsync } from './utils';

export const getRoles = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const results = await rolesService.getAll(req.query);
    res.json(results);
  },
);

export const getRole = controllerCatchAsync(
  async (req: Request<RoleId>, res: Response) => {
    const result = await rolesService.get(req.params.id);
    res.json(result);
  },
);

export const createRole = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const { id } = await rolesService.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: `Role ${id} created successfully` });
  },
);

export const updateRole = controllerCatchAsync(
  async (req: Request<RoleId>, res: Response) => {
    const { id } = await rolesService.update(req.params.id, req.body);
    res.json({ message: `Role ${id} updated successfully` });
  },
);

export const deleteRole = controllerCatchAsync(
  async (req: Request<RoleId>, res: Response) => {
    const { id } = await rolesService.delete(req.params.id);
    res.json({ message: `Role ${id} deleted successfully` });
  },
);
