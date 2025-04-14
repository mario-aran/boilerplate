export class HttpError extends Error {
  public status: number | undefined;

  constructor(status?: number, message = '') {
    super(message);
    this.status = status;
    this.name = 'HttpError';
    Error.captureStackTrace(this, this.constructor);
  }
}
