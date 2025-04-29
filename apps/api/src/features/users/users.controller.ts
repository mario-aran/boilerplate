import { HTTP_STATUS } from '@/constants/http-status';
import { ReadAllUsersZod } from '@/lib/zod/schemas/users.zod';
import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';
import { usersService } from './users.service';

class UsersController {
  public async create(req: Request, res: Response) {
    const createdRecord = await usersService.create(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: `User ${createdRecord.email} created successfully`,
    });
  }

  public async readAll(
    req: Request<unknown, unknown, unknown, ReadAllUsersZod>,
    res: Response,
  ) {
    const results = await usersService.readAll(req.query);
    res.json(results);
  }

  public async read(req: Request, res: Response) {
    const record = await usersService.read(req.params.id);
    if (!record) this.throwNotFoundHttpError();

    res.json(record);
  }

  public async update(req: Request, res: Response) {
    const updatedRecord = await usersService.update(req.params.id, req.body);
    if (!updatedRecord) this.throwNotFoundHttpError();

    res.json({
      message: `User ${updatedRecord.email} updated successfully`,
    });
  }

  public async updatePassword(req: Request, res: Response) {
    const updatedRecord = await usersService.updatePassword(
      req.params.id,
      req.body,
    );
    if (!updatedRecord) this.throwNotFoundHttpError();

    res.json({
      message: `Password for user ${updatedRecord.email} updated successfully`,
    });
  }

  private throwNotFoundHttpError() {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }
}

export const usersController = new UsersController();
