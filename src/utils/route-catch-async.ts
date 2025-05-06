import { NextFunction, Request, Response } from 'express';

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const routeCatchAsync = (handler: Handler) => {
  return (req: Request, res: Response, next: NextFunction) =>
    handler(req, res, next).catch(next);
};
