import { HTTP_STATUS } from '@/server/constants/http-status';
import { HttpError } from '@/server/utils/http-error';
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
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });
};
