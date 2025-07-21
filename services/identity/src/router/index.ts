import { NODE_ENV } from '@/config/env';
import { ROUTES } from '@/constants/routes';
import { swaggerDocument } from '@/lib/swagger/swagger-document';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import { authRoute } from './auth.route';
import { usersRoute } from './users.route';

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

// "swagger-ui-express" routes
router.use(ROUTES.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Api routes
router.use(ROUTES.API, (_, res) =>
  res.json({
    message: 'Welcome to identity service',
    version: '1.0',
    docs: ROUTES.API_DOCS,
  }),
);

router.use(ROUTES.AUTH, authRoute);
router.use(ROUTES.USERS, usersRoute);

// Middleware
router.use(notFoundHandler); // Must be placed after all routes
router.use(globalErrorHandler); // Must be placed last
