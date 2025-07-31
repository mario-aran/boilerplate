import { rolesService } from '@/features/roles/roles.service';
import { RoleId } from '@/lib/zod/schemas/roles.schema';
import { Request, Response } from 'express';
import { controllerCatchAsync } from './utils/controller-catch-async';

class RolesController {
  public getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await rolesService.getAll(req.query);
    res.json(results);
  });

  public get = controllerCatchAsync(
    async (req: Request<RoleId>, res: Response) => {
      const result = await rolesService.get(req.params.id);
      res.json(result);
    },
  );

  public create = async (req: Request, res: Response) => {
    const { id } = await rolesService.create(req.body);
    res.json({ message: `Role ${id} created successfully.` });
  };

  public update = controllerCatchAsync(
    async (req: Request<RoleId>, res: Response) => {
      const { id } = await rolesService.update(req.params.id, req.body);
      res.json({ message: `Role ${id} updated successfully.` });
    },
  );

  public delete = controllerCatchAsync(
    async (req: Request<RoleId>, res: Response) => {
      const { id } = await rolesService.delete(req.params.id);
      res.json({ message: `Role ${id} deleted successfully.` });
    },
  );
}

export const rolesController = new RolesController();
