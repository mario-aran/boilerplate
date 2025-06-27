import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (
  _: Request,
  _res: Response,
  next: NextFunction,
) =>
  next(
    new HttpError({ message: 'Not found', httpStatus: HTTP_STATUS.NOT_FOUND }),
  );
