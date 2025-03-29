import { NextFunction, Request, Response } from 'express';

// Types
type Fn<T> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

export const controllerCatchAsync = <T>(fn: Fn<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
