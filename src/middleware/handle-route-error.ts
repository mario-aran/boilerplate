import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const handleRouteError = (
  err: HttpError,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const errorStatus = err.status ?? HTTP_STATUS.SERVER_ERROR;
  res.status(errorStatus).json({
    status: errorStatus,
    message: err.message || 'Internal Server Error',
    validationErrors: err.validationErrors || undefined,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });
};
