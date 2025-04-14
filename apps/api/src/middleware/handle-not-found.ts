import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const handleNotFound = (
  _: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = new HttpError(404, 'API route not found');

  next(error);
};
