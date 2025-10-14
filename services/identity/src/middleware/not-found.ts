import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const notFound = (_: Request, _res: Response, next: NextFunction) =>
  next(new HttpError({ status: StatusCodes.NOT_FOUND, message: 'Not found' }));
