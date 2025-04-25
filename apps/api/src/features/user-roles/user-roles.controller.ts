import { HTTP_STATUS } from '@/constants/http-status';
import { ReadAllUserRolesZod } from '@/lib/zod/schemas/user-roles.zod';
import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';
import { userRolesService } from './user-roles.service';

class UserRolesController {
  public async readAll(
    req: Request<unknown, unknown, unknown, ReadAllUserRolesZod>,
    res: Response,
  ) {
    const results = await userRolesService.readAll(req.query);
    res.json(results);
  }

  public async read(req: Request, res: Response) {
    const record = await userRolesService.read(req.params.id);
    if (!record) this.throwNotFoundHttpError();

    res.json(record);
  }

  public async create(req: Request, res: Response) {
    const createdRecord = await userRolesService.create(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: `User role ${createdRecord.id} created successfully`,
    });
  }

  public async delete(req: Request, res: Response) {
    const deletedRecord = await userRolesService.delete(req.params.id);
    if (!deletedRecord) this.throwNotFoundHttpError();

    res.json(deletedRecord);
  }

  private throwNotFoundHttpError() {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, 'User role not found');
  }
}

export const userRolesController = new UserRolesController();
