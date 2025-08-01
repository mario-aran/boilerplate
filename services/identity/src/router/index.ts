import { BASE_URL, NODE_ENV } from '@/config/env';
import { ROUTES } from '@/constants/routes';
import { swaggerDocument } from '@/lib/swagger/swagger-document';
import { HttpError } from '@/utils/http-error';
import { DrizzleQueryError } from 'drizzle-orm';
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
  let validationErrors;

  // Http error values
  if (err instanceof HttpError) {
    message = err.message;
    httpStatus = err.httpStatus;
    validationErrors = err.validationErrors;
  }

  // DB error values
  if (err instanceof DrizzleQueryError && err.cause && 'code' in err.cause) {
    switch (err.cause.code) {
      case '23503':
        message = 'Foreign key constraint error';
        httpStatus = StatusCodes.CONFLICT;
        break;
      case '23505':
        message = 'Unique key constraint error';
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

// Router
export const router = Router();

// "swagger-ui-express" routes
router.use(ROUTES.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Api routes
router.use(ROUTES.AUTH, authRoute);
router.use(ROUTES.ROLES, rolesRoute);
router.use(ROUTES.PERMISSIONS, permissionsRoute);

router.get(ROUTES.API, (_, res) =>
  res.json({
    message: 'Identity service',
    version: '1.0',
    docs: `${BASE_URL}${ROUTES.API_DOCS}`,
  }),
);

// Root routes
router.get('/', (_, res) => res.json({ message: 'Service is up and running' }));

// Middlewares
router.use(notFoundHandler); // Must be placed after all routes
router.use(globalErrorHandler); // Must be placed last
