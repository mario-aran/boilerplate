import { requireUserFromReq } from '@/features/auth/utils/require-user-from-req';
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

export const getUserMe = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const reqUser = requireUserFromReq(req);

    const result = await usersService.get(reqUser.id);
    res.json(result);
  },
);

export const getUser = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const result = await usersService.get(req.params.id);
    res.json(result);
  },
);

export const updateUserMe = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const reqUser = requireUserFromReq(req);

    await usersService.update(reqUser.id, req.body);
    res.json({ message: 'User updated successfully' });
  },
);

export const updateUser = controllerCatchAsync(
  async (req: Request, res: Response) => {
    await usersService.update(req.params.id, req.body);
    res.json({ message: 'User updated successfully' });
  },
);

export const deleteUser = controllerCatchAsync(
  async (req: Request, res: Response) => {
    await usersService.delete(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  },
);
