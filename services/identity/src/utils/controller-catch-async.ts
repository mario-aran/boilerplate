import { NextFunction, Request, Response } from 'express';

export const controllerCatchAsync =
  <T extends Request<unknown, unknown, unknown, unknown>>(
    handler: (req: T, res: Response, next: NextFunction) => Promise<void>,
  ) =>
  (req: T, res: Response, next: NextFunction) =>
    handler(req, res, next).catch(next);
