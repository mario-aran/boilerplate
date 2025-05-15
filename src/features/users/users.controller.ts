import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';
import { usersService } from './users.service';

class UsersController {
  public async getAll(req: Request, res: Response) {
    const results = await usersService.getAll(req.query);
    res.json(results);
  }

  public async get(req: Request, res: Response) {
    const record = await usersService.get(req.params.id);
    if (!record) this.throwNotFoundHttpError();

    res.json(record);
  }

  public async create(req: Request, res: Response) {
    const createdRecord = await usersService.create(req.body);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: `User ${createdRecord.email} created successfully` });
  }

  public async update(req: Request, res: Response) {
    const updatedRecord = await usersService.update(req.params.id, req.body);
    if (!updatedRecord) this.throwNotFoundHttpError();

    res.json({ message: `User ${updatedRecord.email} updated successfully` });
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

  private throwNotFoundHttpError(): never {
    throw new HttpError({
      status: HTTP_STATUS.NOT_FOUND,
      message: 'User not found',
    });
  }
}

export const usersController = new UsersController();
