import { NotFoundError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const handleNotFound = (
  _: Request,
  _res: Response,
  next: NextFunction,
) => next(new NotFoundError());
