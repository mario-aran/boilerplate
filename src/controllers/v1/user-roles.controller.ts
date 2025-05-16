import { HTTP_STATUS } from '@/constants/http-status';
import { userRolesService } from '@/services/user-roles.service';
import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';

class UserRolesController {
  public async getAll(req: Request, res: Response) {
    const results = await userRolesService.getAll(req.query);
    res.json(results);
  }

  public async get(req: Request, res: Response) {
    const record = await userRolesService.get(req.params.id);
    if (!record) this.throwNotFoundHttpError();

    res.json(record);
  }

  public async update(req: Request, res: Response) {
    const updatedRecord = await userRolesService.update(
      req.params.id,
      req.body,
    );
    if (!updatedRecord) this.throwNotFoundHttpError();

    res.json({ message: `User role ${updatedRecord.id} updated successfully` });
  }

  private throwNotFoundHttpError(): never {
    throw new HttpError({
      status: HTTP_STATUS.NOT_FOUND,
      message: 'User role not found',
    });
  }
}

export const userRolesController = new UserRolesController();
