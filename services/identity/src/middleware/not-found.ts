import { NotFoundError } from '@/errors/http-errors';
import { NextFunction, Request, Response } from 'express';

export const notFound = (_: Request, _res: Response, next: NextFunction) =>
  next(NotFoundError());
