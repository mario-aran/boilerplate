import { NODE_ENV } from '@/config/env';
import { HttpError } from '@/utils/http-error';
import { DrizzleQueryError } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const globalErrorHandler = (
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  let message = 'Server error';
  let httpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
  let validationErrors;

  // Custom errors
  if (err instanceof HttpError) {
    message = err.message;
    httpStatus = err.httpStatus;
    validationErrors = err.validationErrors;
  }

  // Body parser errors
  if (
    err instanceof SyntaxError &&
    'body' in err &&
    'status' in err &&
    err.status === StatusCodes.BAD_REQUEST
  ) {
    message = 'Malformed JSON body';
    httpStatus = err.status;
  }

  // DB errors
  if (err instanceof DrizzleQueryError && err.cause && 'code' in err.cause) {
    switch (err.cause.code) {
      case '23503':
        message = 'Data relationship constraints';
        httpStatus = StatusCodes.CONFLICT;
        break;
      case '23505':
        message = 'Data already exists';
        httpStatus = StatusCodes.CONFLICT;
        break;
      default:
        message = 'Database error';
    }
  }

  // Prepare response
  const stack = NODE_ENV !== 'production' ? err.stack?.split('\n') : undefined;
  res.status(httpStatus).json({ message, validationErrors, stack });
};
