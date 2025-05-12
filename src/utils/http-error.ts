// Types
type ValidationError = Record<string, string>;

interface HttpErrorOptions {
  status: number;
  message?: string;
  validationErrors?: ValidationError[];
}

export class HttpError extends Error {
  public status: number;
  public validationErrors?: ValidationError[];

  constructor({ status, message = '', validationErrors }: HttpErrorOptions) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.validationErrors = validationErrors;
    Error.captureStackTrace(this, HttpError);
  }

  static throw({ status, message = '', validationErrors }: HttpErrorOptions) {
    throw new HttpError({ status, message, validationErrors });
  }
}
