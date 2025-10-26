import { AccessDeniedError } from '@/errors/http-errors';
import { usersService } from '@/features/users/users.service';
import {
  GetUsers,
  UpdateUser,
  UpdateUserEmail,
  UpdateUserMe,
  UpdateUserPassword,
  UsersParams,
} from '@/lib/zod/schemas/users.schema';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// ---------------------------
// CONTROLLERS: /users/me
// ---------------------------

export const getUserMe = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const { user } = req;
    if (!user) throw AccessDeniedError;

    const result = await usersService.get(user.id);
    res.json(result);
  },
);

export const updateUserMe = controllerCatchAsync(
  async (req: Request<unknown, unknown, UpdateUserMe>, res: Response) => {
    const { user } = req;
    if (!user) throw AccessDeniedError;

    await usersService.update(user.id, req.body);
    res.json({ message: 'User updated successfully' });
  },
);

export const updateUserMeEmail = controllerCatchAsync(
  async (req: Request<unknown, unknown, UpdateUserEmail>, res: Response) => {
    const { user } = req;
    if (!user) throw AccessDeniedError;

    await usersService.updateEmail(user.id, req.body);
    res.json({ message: 'Verification email will be sent shortly' });
  },
);

export const updateUserMePassword = controllerCatchAsync(
  async (req: Request<unknown, unknown, UpdateUserPassword>, res: Response) => {
    const { user } = req;
    if (!user) throw AccessDeniedError;

    await usersService.updatePassword(user.id, req.body);
    res.json({ message: 'Password updated successfully' });
  },
);

// ---------------------------
// CONTROLLERS: /users + /users/:id
// ---------------------------

export const getUsers = controllerCatchAsync(
  async (req: Request<unknown, unknown, unknown, GetUsers>, res: Response) => {
    const result = await usersService.getAll(req.query);
    res.json(result);
  },
);

export const getUser = controllerCatchAsync(
  async (req: Request<UsersParams>, res: Response) => {
    const result = await usersService.get(req.params.id);
    res.json(result);
  },
);

export const updateUser = controllerCatchAsync(
  async (req: Request<UsersParams, unknown, UpdateUser>, res: Response) => {
    await usersService.update(req.params.id, req.body);
    res.json({ message: 'User updated successfully' });
  },
);

export const deleteUser = controllerCatchAsync(
  async (req: Request<UsersParams>, res: Response) => {
    await usersService.delete(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  },
);
