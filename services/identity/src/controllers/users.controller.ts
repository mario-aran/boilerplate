import {
  usersService,
  UsersServiceGetResult,
} from '@/features/users/users.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// ---------------------------
// CONTROLLERS: /users/me
// ---------------------------

export const getUserMe = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const reqUser = req.user as UsersServiceGetResult;

    const result = await usersService.get(reqUser.id);
    res.json(result);
  },
);

export const updateUserMe = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const reqUser = req.user as UsersServiceGetResult;

    await usersService.update(reqUser.id, req.body);
    res.json({ message: 'User updated successfully' });
  },
);

export const updateUserMeEmail = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const reqUser = req.user as UsersServiceGetResult;

    await usersService.updateEmail(reqUser.id, req.body);
    res.json({ message: 'Verification email will be sent shortly' });
  },
);

export const updateUserMePassword = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const reqUser = req.user as UsersServiceGetResult;

    await usersService.updatePassword(reqUser.id, req.body);
    res.json({ message: 'Password updated successfully' });
  },
);

// ---------------------------
// CONTROLLERS: /users + /users/:id
// ---------------------------

export const getUsers = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const result = await usersService.getAll(req.query);
    res.json(result);
  },
);

export const getUser = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const result = await usersService.get(req.params.id);
    res.json(result);
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
