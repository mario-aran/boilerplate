import { rolesService } from '@/features/roles/roles.service';
import {
  CreateRole,
  GetRoles,
  RolesParams,
  UpdateRole,
} from '@/lib/zod/schemas/roles.schema';
import { TypedRequest } from '@/types/typed-request';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getRoles = controllerCatchAsync(
  async (req: TypedRequest<{ query: GetRoles }>, res: Response) => {
    const result = await rolesService.getAll(req.query);
    res.json(result);
  },
);

export const getRole = controllerCatchAsync(
  async (req: TypedRequest<{ params: RolesParams }>, res: Response) => {
    const result = await rolesService.get(req.params.id);
    res.json(result);
  },
);

export const createRole = controllerCatchAsync(
  async (req: TypedRequest<{ body: CreateRole }>, res: Response) => {
    await rolesService.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Role created successfully' });
  },
);

export const updateRole = controllerCatchAsync(
  async (
    req: TypedRequest<{ params: RolesParams; body: UpdateRole }>,
    res: Response,
  ) => {
    await rolesService.update(req.params.id, req.body);
    res.json({ message: 'Role updated successfully' });
  },
);

export const deleteRole = controllerCatchAsync(
  async (req: TypedRequest<{ params: RolesParams }>, res: Response) => {
    await rolesService.delete(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  },
);
