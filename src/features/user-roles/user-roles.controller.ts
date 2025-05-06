import { ReadAllUserRolesZod } from '@/lib/zod/schemas/user-roles.zod';
import { Request, Response } from 'express';
import { userRolesService } from './user-roles.service';

export class UserRolesController {
  public async readAll(
    req: Request<unknown, unknown, unknown, ReadAllUserRolesZod>,
    res: Response,
  ) {
    const results = await userRolesService.readAll(req.query);
    res.json(results);
  }
}

export const userRolesController = new UserRolesController();
