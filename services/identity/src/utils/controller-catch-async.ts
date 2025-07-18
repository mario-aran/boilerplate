import { NextFunction, Request, Response } from 'express';

export const controllerCatchAsync =
  <T extends Record<string, string>>(
    handler: (
      req: Request<T>,
      res: Response,
      next: NextFunction,
    ) => Promise<void>,
  ) =>
  (req: Request<T>, res: Response, next: NextFunction) =>
    handler(req, res, next).catch(next);
