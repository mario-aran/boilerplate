import { NextFunction, Request, Response } from 'express';

// Types
type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const controllerCatchAsync = (asyncHandler: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) =>
    asyncHandler(req, res, next).catch(next);
};
