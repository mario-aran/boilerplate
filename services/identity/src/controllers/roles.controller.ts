import { rolesService } from '@/features/roles/roles.service';
import {
  CreateRole,
  GetRoles,
  RolesParams,
  UpdateRole,
} from '@/lib/zod/schemas/roles.schema';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getRoles = controllerCatchAsync(
  async (req: Request<unknown, unknown, unknown, GetRoles>, res: Response) => {
    const result = await rolesService.getAll(req.query);
    res.json(result);
  },
);

export const getRole = controllerCatchAsync(
  async (req: Request<RolesParams>, res: Response) => {
    const result = await rolesService.get(req.params.id);
    res.json(result);
  },
);

export const createRole = controllerCatchAsync(
  async (req: Request<unknown, unknown, CreateRole>, res: Response) => {
    await rolesService.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Role created successfully' });
  },
);

export const updateRole = controllerCatchAsync(
  async (req: Request<RolesParams, unknown, UpdateRole>, res: Response) => {
    await rolesService.update(req.params.id, req.body);
    res.json({ message: 'Role updated successfully' });
  },
);

export const deleteRole = controllerCatchAsync(
  async (req: Request<RolesParams>, res: Response) => {
    await rolesService.delete(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  },
);
