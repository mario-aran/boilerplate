import { usersService } from '@/features/users/users.service';
import {
  GetUsers,
  UpdateUser,
  UpdateUserMe,
  UpdateUserMeEmail,
  UpdateUserMePassword,
  UsersParams,
} from '@/lib/zod/schemas/users.schema';
import { TypedRequest } from '@/types/typed-request';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { requireReqUser } from '@/utils/require-req-user';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// ---------------------------
// ROUTES: /users/me
// ---------------------------

export const getUserMe = controllerCatchAsync(
  async (req: Request, res: Response) => {
    const user = requireReqUser(req);

    const result = await usersService.get(user.id);
    res.json(result);
  },
);

export const updateUserMe = controllerCatchAsync(
  async (req: TypedRequest<{ body: UpdateUserMe }>, res: Response) => {
    const user = requireReqUser(req);

    await usersService.update(user.id, req.body);
    res.json({ message: 'User updated successfully' });
  },
);

export const updateUserMeEmail = controllerCatchAsync(
  async (req: TypedRequest<{ body: UpdateUserMeEmail }>, res: Response) => {
    const user = requireReqUser(req);

    await usersService.requestEmailUpdate(user.id, req.body);
    res.json({ message: 'Verification email will be sent shortly' });
  },
);

export const updateUserMePassword = controllerCatchAsync(
  async (req: TypedRequest<{ body: UpdateUserMePassword }>, res: Response) => {
    const user = requireReqUser(req);

    await usersService.updatePassword(user.id, req.body);
    res.json({ message: 'Password updated successfully' });
  },
);

// ---------------------------
// ROUTES: /users + /users/:id
// ---------------------------

export const getUsers = controllerCatchAsync(
  async (req: TypedRequest<{ query: GetUsers }>, res: Response) => {
    const result = await usersService.getAll(req.query);
    res.json(result);
  },
);

export const getUser = controllerCatchAsync(
  async (req: TypedRequest<{ params: UsersParams }>, res: Response) => {
    const result = await usersService.get(req.params.id);
    res.json(result);
  },
);

export const updateUser = controllerCatchAsync(
  async (
    req: TypedRequest<{ params: UsersParams; body: UpdateUser }>,
    res: Response,
  ) => {
    const user = requireReqUser(req);

    await usersService.update(req.params.id, req.body, { callerId: user.id });
    res.json({ message: 'User updated successfully' });
  },
);

export const deleteUser = controllerCatchAsync(
  async (req: TypedRequest<{ params: UsersParams }>, res: Response) => {
    const user = requireReqUser(req);

    await usersService.delete(req.params.id, { callerId: user.id });
    res.sendStatus(StatusCodes.NO_CONTENT);
  },
);
