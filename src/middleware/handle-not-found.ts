import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const handleNotFound = (
  _: Request,
  _res: Response,
  next: NextFunction,
) =>
  next(
    new HttpError({
      status: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Not found',
    }),
  );
