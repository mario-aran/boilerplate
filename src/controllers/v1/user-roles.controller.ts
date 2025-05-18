import { HTTP_STATUS } from '@/constants/http-status';
import { UserRoleId } from '@/lib/zod/schemas/v1/user-roles.schema';
import { userRolesService } from '@/services/user-roles.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';

// Errors
const notFoundHttpError = new HttpError({
  status: HTTP_STATUS.NOT_FOUND,
  message: 'User role not found',
});

class UserRolesController {
  public getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await userRolesService.getAll(req.query);
    res.json(results);
  });

  public get = controllerCatchAsync(
    async (req: Request<UserRoleId>, res: Response) => {
      const record = await userRolesService.get(req.params);
      if (!record) throw notFoundHttpError;

      res.json(record);
    },
  );

  public update = controllerCatchAsync(
    async (req: Request<UserRoleId>, res: Response) => {
      const updatedRecord = await userRolesService.update(req.params, req.body);
      if (!updatedRecord) throw notFoundHttpError;

      res.json({
        message: `User role ${updatedRecord.id} updated successfully`,
      });
    },
  );
}

export const userRolesController = new UserRolesController();
