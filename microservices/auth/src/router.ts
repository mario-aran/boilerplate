import { NODE_ENV } from '@/config/env';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { routesV1 } from './routes/v1';

// Utils
const notFoundHandler = (_: Request, _res: Response, next: NextFunction) =>
  next(
    new HttpError({
      message: 'Not found',
      httpStatus: StatusCodes.NOT_FOUND,
    }),
  );

const globalErrorHandler = (
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const isHttpError = err instanceof HttpError;
  const httpStatus = isHttpError
    ? err.httpStatus
    : StatusCodes.INTERNAL_SERVER_ERROR;
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

// Router
export const router = Router();

// Routes
router.get('/', (_, res) => res.json({ message: 'Service is up and running' }));
router.use(routesV1);

// Middleware
router.use(notFoundHandler); // Must be placed after all routes
router.use(globalErrorHandler); // Must be placed last
