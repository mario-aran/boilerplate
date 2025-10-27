import { StatusCodes } from 'http-status-codes';
import { ApiError } from './utils/api-error';

// ---------------------------
// 401 UNAUTHORIZED
// ---------------------------

export const UnauthorizedError = new ApiError({
  status: StatusCodes.UNAUTHORIZED,
  message: 'Unauthorized',
});

export const InvalidCredentialsError = new ApiError({
  status: StatusCodes.UNAUTHORIZED,
  message: 'Invalid credentials',
});

export const InvalidTokenError = new ApiError({
  status: StatusCodes.UNAUTHORIZED,
  message: 'Invalid token',
});

// ---------------------------
// 403 FORBIDDEN
// ---------------------------

export const AccessDeniedError = new ApiError({
  status: StatusCodes.FORBIDDEN,
  message: 'Access denied',
});

export const EmailNotVerifiedError = new ApiError({
  status: StatusCodes.FORBIDDEN,
  message: 'Email not verified',
});

export const SelfActionError = new ApiError({
  status: StatusCodes.FORBIDDEN,
  message: 'Action not allowed on own account',
});

// ---------------------------
// 404 NOT FOUND
// ---------------------------

export const NotFoundError = new ApiError({
  status: StatusCodes.NOT_FOUND,
  message: 'Not found',
});

export const buildEntityNotFoundError = (entity: string) =>
  new ApiError({
    status: StatusCodes.NOT_FOUND,
    message: `${entity} not found`,
  });

// ---------------------------
// 409 CONFLICT
// ---------------------------

export const EmailAlreadyVerifiedError = new ApiError({
  status: StatusCodes.CONFLICT,
  message: 'Email already verified',
});

// ---------------------------
// 422 UNPROCESSABLE ENTITY
// ---------------------------

export const buildValidationFailedError = (
  validationErrors: ApiError['validationErrors'],
) =>
  new ApiError({
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: 'Validation failed',
    validationErrors,
  });
