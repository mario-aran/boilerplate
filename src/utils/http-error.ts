export class HttpError extends Error {
  public status: number | undefined;
  public details: unknown;

  constructor(status: number, message = '', details: unknown = undefined) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.details = details;
    Error.captureStackTrace(this, HttpError);
  }
}
