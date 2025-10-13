import { rolesService } from '@/features/roles/roles.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getRoles = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const result = await rolesService.getAll(req.query);
    res.json(result);
  },
);

export const getRole = controllerCatchAsync(
  async (req: Request, res: Response) => {
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
  async (req: Request, res: Response) => {
    const { id } = await rolesService.update(req.params.id, req.body);
    res.json({ message: `Role ${id} updated successfully` });
  },
);

export const deleteRole = controllerCatchAsync(
  async (req: Request, res: Response) => {
    await rolesService.delete(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  },
);
