// Types
type ValidationErrors = Record<string, string>[];

interface HttpErrorProps {
  message: string;
  httpStatus: number;
  validationErrors?: ValidationErrors;
}

export class HttpError extends Error {
  public httpStatus: number;
  public validationErrors?: ValidationErrors;

  constructor({ message, httpStatus, validationErrors }: HttpErrorProps) {
    super(message);
    this.name = new.target.name;
    this.httpStatus = httpStatus;
    this.validationErrors = validationErrors;
    Error.captureStackTrace(this, new.target);
  }
}
