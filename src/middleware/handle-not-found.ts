import { NotFoundError } from '@/utils/errors';
import { NextFunction, Request, Response } from 'express';

export const handleNotFound = (
  _: Request,
  _res: Response,
  next: NextFunction,
) => next(new NotFoundError());
