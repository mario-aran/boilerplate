type ValidationErrors = Record<string, string>[];

interface ApiErrorProps {
  message: string;
  status: number;
  validationErrors?: ValidationErrors;
}

export class ApiError extends Error {
  readonly status: number;
  readonly validationErrors?: ValidationErrors;

  constructor({ message, status, validationErrors }: ApiErrorProps) {
    super(message);
    this.status = status;
    this.validationErrors = validationErrors;

    this.name = new.target.name;
    Error.captureStackTrace(this, new.target);
  }
}
