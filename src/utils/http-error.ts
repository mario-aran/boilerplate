import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';

// Types
type ValidationErrors = Record<string, string>[];

interface HttpErrorProps {
  message?: string;
  httpStatusCode: number;
  validationErrors?: ValidationErrors;
}

interface ZodValidationErrorProps {
  validationErrors: ValidationErrors;
}

export class HttpError extends Error {
  public httpStatusCode: number;
  public validationErrors?: ValidationErrors;

  constructor({
    message = '',
    httpStatusCode,
    validationErrors,
  }: HttpErrorProps) {
    super(message);
    this.name = new.target.name;
    this.httpStatusCode = httpStatusCode;
    this.validationErrors = validationErrors;
    Error.captureStackTrace(this, new.target);
  }
}

export class UnauthorizedError extends HttpError {
  constructor({ message = 'Unauthorized' } = {}) {
    super({ message, httpStatusCode: HTTP_STATUS_CODES.UNAUTHORIZED });
  }
}

export class ForbiddenError extends HttpError {
  constructor({ message = 'Forbidden' } = {}) {
    super({ message, httpStatusCode: HTTP_STATUS_CODES.FORBIDDEN });
  }
}

export class NotFoundError extends HttpError {
  constructor({ message = 'Not found' } = {}) {
    super({ message, httpStatusCode: HTTP_STATUS_CODES.NOT_FOUND });
  }
}

export class ConflictError extends HttpError {
  constructor({ message = 'Conflict' } = {}) {
    super({ message, httpStatusCode: HTTP_STATUS_CODES.CONFLICT });
  }
}

export class UnprocessableError extends HttpError {
  constructor({ message = 'Unprocessable' } = {}) {
    super({ message, httpStatusCode: HTTP_STATUS_CODES.UNPROCESSABLE });
  }
}

export class ZodValidationError extends HttpError {
  constructor({ validationErrors }: ZodValidationErrorProps) {
    super({
      message: 'Invalid inputs',
      httpStatusCode: HTTP_STATUS_CODES.UNPROCESSABLE,
      validationErrors,
    });
  }
}
