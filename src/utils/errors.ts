import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';

export class UnauthorizedError extends Error {
  constructor(
    message = 'Unauthorized',
    public statusCode = HTTP_STATUS_CODES.UNAUTHORIZED,
  ) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(
    message = 'Forbidden',
    public StatusCode = HTTP_STATUS_CODES.FORBIDDEN,
  ) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Error {
  constructor(
    message = 'Not found',
    public statusCode = HTTP_STATUS_CODES.NOT_FOUND,
  ) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  constructor(
    message = 'Conflict',
    public statusCode = HTTP_STATUS_CODES.CONFLICT,
  ) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class UnprocessableError extends Error {
  constructor(
    message = 'Unprocessable',
    public statusCode = HTTP_STATUS_CODES.UNPROCESSABLE,
  ) {
    super(message);
    this.name = 'UnprocessableError';
  }
}

export class InternalServerError extends Error {
  constructor(
    message = 'Internal server error',
    public statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER,
  ) {
    super(message);
    this.name = 'InternalServerError';
  }
}
