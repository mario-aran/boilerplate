import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';
import { UserId } from '@/lib/zod/schemas/users.schema';
import { usersService } from '@/services/users.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

class UsersController {
  public getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await usersService.getAll(req.query);
    res.json(results);
  });

  public get = controllerCatchAsync(
    async (req: Request<UserId>, res: Response) => {
      const record = await usersService.get(req.params);
      res.json(record);
    },
  );

  public create = controllerCatchAsync(async (req: Request, res: Response) => {
    const createdRecord = await usersService.create(req.body);
    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json({ message: `User ${createdRecord.email} created successfully` });
  });

  public update = controllerCatchAsync(
    async (req: Request<UserId>, res: Response) => {
      const updatedRecord = await usersService.update(req.params, req.body);
      res.json({ message: `User ${updatedRecord.email} updated successfully` });
    },
  );

  public updatePassword = controllerCatchAsync(
    async (req: Request<UserId>, res: Response) => {
      const updatedRecord = await usersService.updatePassword(
        req.params,
        req.body,
      );
      res.json({
        message: `Password for user ${updatedRecord.email} updated successfully`,
      });
    },
  );
}

export const usersController = new UsersController();
