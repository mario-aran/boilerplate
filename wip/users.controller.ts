import { UserId } from "@/lib/zod/schemas/users.schema";
import { usersService } from "@/services/users.service";
import { controllerCatchAsync } from "@/utils/controller-catch-async";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class UsersController {
  getAll = controllerCatchAsync(async (req: Request, res: Response) => {
    const results = await usersService.getAll(req.query);
    res.json(results);
  });

  get = controllerCatchAsync(async (req: Request<UserId>, res: Response) => {
    const result = await usersService.get(req.params);
    res.json(result);
  });

  create = controllerCatchAsync(async (req: Request, res: Response) => {
    const result = await usersService.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: `User ${result.email} created successfully` });
  });

  update = controllerCatchAsync(async (req: Request<UserId>, res: Response) => {
    const result = await usersService.update(req.params, req.body);
    res.json({ message: `User ${result.email} updated successfully` });
  });

  updatePassword = controllerCatchAsync(
    async (req: Request<UserId>, res: Response) => {
      const result = await usersService.updatePassword(req.params, req.body);
      res.json({
        message: `Password for user ${result.email} updated successfully`,
      });
    }
  );
}

export const usersController = new UsersController();
