import { HTTP_STATUS_CODES } from '@/constants/http-status-codes';
import { AnyZodObject, ZodError, ZodIssue } from '@/lib/zod';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

// Types
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

        const zodHttpError = new HttpError({
          status: HTTP_STATUS_CODES.UNPROCESSABLE_CONTENT,
          message: 'Invalid inputs',
          validationErrors,
        });

        // Failed: zod error
        return next(zodHttpError);
      }

      // Failed: internal error
      return next(err);
    }
  };
};
