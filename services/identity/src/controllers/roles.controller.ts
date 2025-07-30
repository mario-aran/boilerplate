import { rolesService } from '@/features/roles/roles.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';

class RolesController {
  public getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await rolesService.getAll(req.query);
    res.json(results);
  });

  public get = controllerCatchAsync(
    async (req: Request<{ id: string }>, res: Response) => {
      const result = await rolesService.get(req.params.id);
      res.json(result);
    },
  );

  public update = controllerCatchAsync(
    async (req: Request<{ id: string }>, res: Response) => {
      const { id } = await rolesService.update(req.params.id, req.body);
      res.json({ message: `Role ${id} updated successfully` });
    },
  );
}

export const rolesController = new RolesController();
