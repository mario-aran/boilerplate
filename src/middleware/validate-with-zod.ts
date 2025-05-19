import { AnyZodObject, ZodError, ZodIssue } from '@/lib/zod';
import { UnprocessableError } from '@/utils/errors';
import { NextFunction, Request, Response } from 'express';

interface ValidateWithZodProps {
  params?: AnyZodObject;
  query?: AnyZodObject;
  body?: AnyZodObject;
}

// Types
type ValidationErrors = Record<string, string>[];

interface ZodValidationErrorProps {
  validationErrors: ValidationErrors;
}

// Utils
class ZodValidationError extends UnprocessableError {
  public validationErrors: ValidationErrors;

  constructor({ validationErrors }: ZodValidationErrorProps) {
    super('Invalid inputs');
    this.name = 'ZodValidationError';
    this.validationErrors = validationErrors;
  }
}

export const validateWithZod = ({
  params,
  query,
  body,
}: ValidateWithZodProps) => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      params?.parse(req.params);
      query?.parse(req.query);
      body?.parse(req.body);

      // Succeeded
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const validationErrors = err.errors.map((issue: ZodIssue) => ({
          field: `${issue.path.join('.')}`,
          message: issue.message,
        }));

        // Failed: zod error
        return next(new ZodValidationError({ validationErrors }));
      }

      // Failed: internal error
      return next(err);
    }
  };
};
