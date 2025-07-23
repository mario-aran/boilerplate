import { usersService } from '@/services/users.service';
import { controllerCatchAsync } from '@/utils/controller-catch-async';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class AuthController {
  public register = controllerCatchAsync(
    async (req: Request, res: Response) => {
      const result = await usersService.create(req.body);

      res
        .status(StatusCodes.CREATED)
        .json({ message: `User ${result.email} created successfully` });
    },
  );
}

export const authController = new AuthController();
