import { NotFoundError } from '@/errors/api-errors';
import { NextFunction, Request, Response } from 'express';

export const notFound = (_: Request, _res: Response, next: NextFunction) => {
  next(NotFoundError);
};
