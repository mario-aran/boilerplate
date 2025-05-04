import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

// HTTP errors
const notFoundError = new HttpError(HTTP_STATUS.NOT_FOUND, 'Not found');

export const handleNotFound = (
  _: Request,
  _res: Response,
  next: NextFunction,
) => next(notFoundError);
