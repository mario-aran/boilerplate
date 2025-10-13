import { RequestWithUser } from '@/features/auth/types';
import { usersService } from '@/features/users/users.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getUsers = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const result = await usersService.getAll(req.query);
    res.json(result);
  },
);

export const getUsersMe = controllerCatchAsync(
  async (req: RequestWithUser, res: Response) => {
    const result = await usersService.get(req.user.id);
    res.json(result);
  },
);

export const getUser = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const result = await usersService.get(req.params.id);
    res.json(result);
  },
);

export const updateUsersMe = controllerCatchAsync(
  async (req: RequestWithUser, res: Response) => {
    await usersService.update(req.user.id, req.body);
    res.json({ message: 'User updated successfully' });
  },
);

export const updateUser = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const { id } = await usersService.update(req.params.id, req.body);
    res.json({ message: `User ${id} updated successfully` });
  },
);

export const deleteUser = controllerCatchAsync(
  async (req: Request, res: Response) => {
    await usersService.delete(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  },
);
