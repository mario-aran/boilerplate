import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/server/utils/http-error';
import { Request, Response } from 'express';
import { usersService } from '../../features/users/users.service';
import { GetAllUsersZod } from '../../lib/zod/schemas/users.zod';

class UsersController {
  public async getAll(
    req: Request<unknown, unknown, unknown, GetAllUsersZod>,
    res: Response,
  ) {
    const users = await usersService.getAll(req.query);
    res.json(users);
  }

  public async get(req: Request, res: Response) {
    const user = await usersService.get(req.params.id);
    if (!user) this.throwNotFoundHttpError();

    res.json(user);
  }

  public async create(req: Request, res: Response) {
    const createdUser = await usersService.create(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: `User ${createdUser.id} created successfully`,
    });
  }

  public async update(req: Request, res: Response) {
    const updatedUser = await usersService.updatePassword(
      req.params.id,
      req.body,
    );
    if (!updatedUser) this.throwNotFoundHttpError();

    res.json({
      message: `User ${updatedUser.id} updated successfully`,
    });
  }

  public async updatePassword(req: Request, res: Response) {
    const updatedUser = await usersService.updatePassword(
      req.params.id,
      req.body,
    );
    if (!updatedUser) this.throwNotFoundHttpError();

    res.json({
      message: `Password for ${updatedUser.id} updated successfully`,
    });
  }

  private throwNotFoundHttpError() {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }
}

export const usersController = new UsersController();
