import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const handleNotFound = (
  _: Request,
  _res: Response,
  next: NextFunction,
) => {
  const httpError = new HttpError(HTTP_STATUS.NOT_FOUND, 'Route not found');
  return next(httpError);
};
