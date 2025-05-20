import { AnyZodObject, ZodError, ZodIssue } from '@/lib/zod';
import { ZodValidationError } from '@/utils/errors';
import { NextFunction, Request, Response } from 'express';

interface ValidateWithZodProps {
  params?: AnyZodObject;
  query?: AnyZodObject;
  body?: AnyZodObject;
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

      return next(); // Succeeded
    } catch (err) {
      if (err instanceof ZodError) {
        const validationErrors = err.errors.map((issue: ZodIssue) => ({
          field: `${issue.path.join('.')}`,
          message: issue.message,
        }));
        return next(new ZodValidationError({ validationErrors })); // Failed: zod error
      }

      return next(err); // Failed: internal error
    }
  };
};
