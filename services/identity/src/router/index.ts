import { NODE_ENV } from '@/config/env';
import { ROUTES } from '@/constants/routes';
import { swaggerDocument } from '@/lib/swagger';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import { authRoute } from './auth.route';
import { permissionsRoute } from './permissions.route';
import { rolesRoute } from './roles.route';

// Utils
const notFoundHandler = (_: Request, _res: Response, next: NextFunction) =>
  next(
    new HttpError({ message: 'Not found', httpStatus: StatusCodes.NOT_FOUND }),
  );

const globalErrorHandler = (
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  let message = 'Server error';
  let httpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
  let validationErrors: HttpError['validationErrors'];
  let stack: string[] | undefined;

  // Development values
  if (NODE_ENV !== 'production') {
    stack = err.stack?.split('\n').map((line) => line.trim());
  }

  // Http error values
  if (err instanceof HttpError) {
    message = err.message;
    httpStatus = err.httpStatus;
    validationErrors = err.validationErrors;
  }

  // DB error values
  switch ('code' in err && err.code) {
    case '23505':
      httpStatus = StatusCodes.CONFLICT;
      message = 'Conflict error: Unique key constraint.';
      break;
    case '23503':
      httpStatus = StatusCodes.CONFLICT;
      message = 'Conflict error: Foreign key constraint.';
      break;
  }

  res.status(httpStatus).json({ message, validationErrors, stack });
};

// Router
export const router = Router();

// "swagger-ui-express" routes
router.use(ROUTES.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Api routes
router.use(ROUTES.AUTH, authRoute);
router.use(ROUTES.ROLES, rolesRoute);
router.use(ROUTES.PERMISSIONS, permissionsRoute);

router.use(ROUTES.API, (_, res) =>
  res.json({
    message: 'Identity service',
    version: '1.0',
    docs: ROUTES.API_DOCS,
  }),
);

// Root routes
router.use('/', (_, res) => res.json({ message: 'Service is up and running' }));

// Middlewares
router.use(notFoundHandler); // Must be placed after all routes
router.use(globalErrorHandler); // Must be placed last
