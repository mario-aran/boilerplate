import { NextFunction, Request, Response } from 'express';

export const routeCatchAsync = <
  TParams = unknown,
  TResBody = unknown,
  TReqBody = unknown,
  TReqQuery = unknown,
>(
  handler: (
    req: Request<TParams, TResBody, TReqBody, TReqQuery>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>,
) => {
  return (
    req: Request<TParams, TResBody, TReqBody, TReqQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    handler(req, res, next).catch(next);
  };
};
