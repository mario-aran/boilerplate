import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

// Errors
const notFoundHttpError = new HttpError({
  status: HTTP_STATUS.NOT_FOUND,
  message: 'Not found',
});

export const handleNotFound = (
  _: Request,
  _res: Response,
  next: NextFunction,
) => next(notFoundHttpError);
