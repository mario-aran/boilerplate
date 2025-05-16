// Types
type ValidationErrors = Record<string, string>[];

interface HttpErrorProps {
  status: number;
  message?: string;
  validationErrors?: ValidationErrors;
}

export class HttpError extends Error {
  public status: number;
  public validationErrors?: ValidationErrors;

  constructor({ status, message = '', validationErrors }: HttpErrorProps) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.validationErrors = validationErrors;
    Error.captureStackTrace(this, HttpError);
  }
}
