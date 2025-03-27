import { ErrorWithStatus } from '@/types/error-with-status';
import { NextFunction, Request, Response } from 'express';

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  const error: ErrorWithStatus = new Error('API route not found');
  error.status = 404;

  next(error);
};
