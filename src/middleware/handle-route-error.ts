import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const handleRouteError = (
  err: HttpError,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  res.status(err.status ?? HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: err.message || 'Internal server error',
    validationErrors: err.validationErrors || undefined,
    stack:
      process.env.NODE_ENV !== 'production'
        ? err.stack?.split('\n').map((line) => line.trim())
        : undefined,
  });
};
