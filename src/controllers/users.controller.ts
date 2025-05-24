import { HTTP_STATUS } from '@/constants/http-status';
import { UserId } from '@/lib/zod/schemas/users.schema';
import { usersService } from '@/services/users.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

class UsersController {
  public getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const records = await usersService.getAll(req.query);
    res.json(records);
  });

  public get = controllerCatchAsync(
    async (req: Request<UserId>, res: Response) => {
      const record = await usersService.get(req.params);
      res.json(record);
    },
  );

  public create = controllerCatchAsync(async (req: Request, res: Response) => {
    const { email } = await usersService.create(req.body);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: `User ${email} created successfully` });
  });

  public update = controllerCatchAsync(
    async (req: Request<UserId>, res: Response) => {
      const { email } = await usersService.update(req.params, req.body);
      res.json({ message: `User ${email} updated successfully` });
    },
  );

  public updatePassword = controllerCatchAsync(
    async (req: Request<UserId>, res: Response) => {
      const { email } = await usersService.updatePassword(req.params, req.body);
      res.json({ message: `Password for user ${email} updated successfully` });
    },
  );
}

export const usersController = new UsersController();
