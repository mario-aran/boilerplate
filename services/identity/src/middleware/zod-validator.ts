import { buildValidationFailedError } from '@/errors/http-errors';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodObject } from 'zod';

interface ZodValidatorProps {
  params?: ZodObject;
  query?: ZodObject;
  body?: ZodObject;
}

export const zodValidator =
  ({ params, query, body }: ZodValidatorProps) =>
  (req: Request, _: Response, next: NextFunction) => {
    try {
      // Validate request data
      params?.parse(req.params);
      query?.parse(req.query);
      body?.parse(req.body);

      // Succeeded
      next();
    } catch (err) {
      // Failed: zod error
      if (err instanceof ZodError) {
        const validationErrors = err.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        next(buildValidationFailedError(validationErrors));
        return;
      }

      // Failed: regular error
      next(err);
    }
  };
