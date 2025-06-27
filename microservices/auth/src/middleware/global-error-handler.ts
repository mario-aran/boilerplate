import { NODE_ENV } from '@/config/env';
import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const isHttpError = err instanceof HttpError;
  const httpStatus = isHttpError ? err.httpStatus : HTTP_STATUS.INTERNAL_SERVER;
  const validationErrors = isHttpError ? err.validationErrors : undefined;

  res.status(httpStatus).json({
    message: err.message || 'Internal server error',
    validationErrors,
    stack:
      NODE_ENV !== 'production'
        ? err.stack?.split('\n').map((line) => line.trim())
        : undefined,
  });
};
