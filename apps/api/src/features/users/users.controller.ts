import { HTTP_STATUS } from '@/constants/http-status';
import { GetAllUsersZod } from '@/lib/zod/schemas/users.zod';
import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';
import { usersService } from './users.service';

class UsersController {
  public async getAll(
    req: Request<unknown, unknown, unknown, GetAllUsersZod>,
    res: Response,
  ) {
    const results = await usersService.getAll(req.query);
    res.json(results);
  }

  public async get(req: Request, res: Response) {
    const entity = await usersService.get(req.params.id);
    if (!entity) this.throwNotFoundHttpError();

    res.json(entity);
  }

  public async create(req: Request, res: Response) {
    const createdEntity = await usersService.create(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: `User ${createdEntity.email} created successfully`,
    });
  }

  public async update(req: Request, res: Response) {
    const updatedEntity = await usersService.update(req.params.id, req.body);
    if (!updatedEntity) this.throwNotFoundHttpError();

    res.json({
      message: `User ${updatedEntity.email} updated successfully`,
    });
  }

  public async updatePassword(req: Request, res: Response) {
    const updatedEntity = await usersService.updatePassword(
      req.params.id,
      req.body,
    );
    if (!updatedEntity) this.throwNotFoundHttpError();

    res.json({
      message: `Password for ${updatedEntity.email} updated successfully`,
    });
  }

  private throwNotFoundHttpError() {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }
}

export const usersController = new UsersController();
