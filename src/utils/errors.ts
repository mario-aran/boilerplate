import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';

export class UnauthorizedError extends Error {
  public statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;

  constructor({ message = 'Unauthorized' }) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  public statusCode = HTTP_STATUS_CODES.FORBIDDEN;

  constructor({ message = 'Forbidden' }) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Error {
  public statusCode = HTTP_STATUS_CODES.NOT_FOUND;

  constructor({ message = 'Not found' }) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  public statusCode = HTTP_STATUS_CODES.CONFLICT;

  constructor({ message = 'Conflict' }) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class UnprocessableError extends Error {
  public statusCode = HTTP_STATUS_CODES.UNPROCESSABLE;

  constructor({ message = 'Unprocessable' }) {
    super(message);
    this.name = 'UnprocessableError';
  }
}

export class ZodValidationError extends UnprocessableError {
  public validationErrors: Record<string, string>[];

  constructor({
    validationErrors,
  }: {
    validationErrors: Record<string, string>[];
  }) {
    super({ message: 'Invalid inputs' });
    this.name = 'ZodValidationError';
    this.validationErrors = validationErrors;
  }
}

export class InternalServerError extends Error {
  public statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER;

  constructor({ message = 'Internal server error' }) {
    super(message);
    this.name = 'InternalServerError';
  }
}
