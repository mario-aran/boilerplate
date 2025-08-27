import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Values
const notFoundError = new HttpError({
  message: 'Not found',
  status: StatusCodes.NOT_FOUND,
});

export const notFound = (_: Request, _res: Response, next: NextFunction) =>
  next(notFoundError);
