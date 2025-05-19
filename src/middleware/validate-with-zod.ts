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
