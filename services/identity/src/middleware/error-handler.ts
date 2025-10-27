import { ApiError } from '@/errors/utils/api-error';
import { logger } from '@/lib/logger/winston-logger';
import { DrizzleQueryError } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  // Disabled eslint: to not being forced to use "_next"
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  let status = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Server error';
  let validationErrors: ApiError['validationErrors'];

  // Check application error
  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    validationErrors = err.validationErrors;
  }

  // Check body parser error
  if (
    err instanceof SyntaxError &&
    'status' in err &&
    err.status === StatusCodes.BAD_REQUEST &&
    'body' in err
  ) {
    status = err.status;
    message = 'Malformed JSON body';
  }

  // Check db error
  if (err instanceof DrizzleQueryError && err.cause && 'code' in err.cause) {
    switch (err.cause.code) {
      case '23503':
        status = StatusCodes.CONFLICT;
        message = 'Data relationship constraints';
        break;
      case '23505':
        status = StatusCodes.CONFLICT;
        message = 'Data already exists';
        break;

      default:
        status = StatusCodes.INTERNAL_SERVER_ERROR;
        message = 'Database error';
    }
  }

  logger.error(err.stack ?? message);
  res.status(status).json({ message, validationErrors });
};
