import { UserRoleId } from '@/lib/zod/schemas/user-roles.schema';
import { userRolesService } from '@/services/user-roles.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

class UserRolesController {
  public getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await userRolesService.getAll(req.query);
    res.json(results);
  });

  public get = controllerCatchAsync(
    async (req: Request<UserRoleId>, res: Response) => {
      const record = await userRolesService.get(req.params);
      res.json(record);
    },
  );

  public update = controllerCatchAsync(
    async (req: Request<UserRoleId>, res: Response) => {
      const updatedRecord = await userRolesService.update(req.params, req.body);
      res.json({
        message: `User role ${updatedRecord.id} updated successfully`,
      });
    },
  );
}

export const userRolesController = new UserRolesController();
