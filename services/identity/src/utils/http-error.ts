// Types
type ValidationErrors = Record<string, string>[];

interface HttpErrorProps {
  message: string;
  status: number;
  validationErrors?: ValidationErrors;
}

export class HttpError extends Error {
  readonly status: number;
  readonly validationErrors?: ValidationErrors;

  constructor({ message, status, validationErrors }: HttpErrorProps) {
    super(message);
    this.status = status;
    this.validationErrors = validationErrors;

    this.name = new.target.name;
    Error.captureStackTrace(this, new.target);
  }
}
