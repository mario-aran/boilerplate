import { NextFunction, Request, Response } from 'express';

// Types
type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const controllerCatchAsync = (handler: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) =>
    handler(req, res, next).catch(next);
};
