import { HttpError } from '@/utils/http-error';
import { StatusCodes } from 'http-status-codes';

// ---------------------------
// 401 UNAUTHORIZED
// ---------------------------

export const InvalidTokenError = new HttpError({
  status: StatusCodes.UNAUTHORIZED,
  message: 'Invalid token',
});

export const UnauthorizedError = new HttpError({
  status: StatusCodes.UNAUTHORIZED,
  message: 'Unauthorized',
});

// ---------------------------
// 403 FORBIDDEN
// ---------------------------

export const AccessDeniedError = new HttpError({
  status: StatusCodes.FORBIDDEN,
  message: 'Access denied',
});

export const EmailNotVerifiedError = new HttpError({
  status: StatusCodes.FORBIDDEN,
  message: 'Email not verified',
});

export const ForbiddenError = new HttpError({
  status: StatusCodes.FORBIDDEN,
  message: 'Forbidden',
});

export const InvalidCredentialsError = new HttpError({
  status: StatusCodes.FORBIDDEN,
  message: 'Invalid credentials',
});

// ---------------------------
// 404 NOT FOUND
// ---------------------------

export const NotFoundError = new HttpError({
  status: StatusCodes.NOT_FOUND,
  message: 'Not found',
});

export const buildEntityNotFoundError = (entity: string) =>
  new HttpError({
    status: StatusCodes.NOT_FOUND,
    message: `${entity} not found`,
  });

// ---------------------------
// 409 CONFLICT
// ---------------------------

export const EmailAlreadyVerifiedError = new HttpError({
  status: StatusCodes.CONFLICT,
  message: 'Email already verified',
});

// ---------------------------
// 422 UNPROCESSABLE ENTITY
// ---------------------------

export const buildValidationFailedError = (
  validationErrors: HttpError['validationErrors'],
) =>
  new HttpError({
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: 'Validation failed',
    validationErrors,
  });
