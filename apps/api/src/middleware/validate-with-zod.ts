import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';

// Types
interface Schema {
  params?: AnyZodObject;
  query?: AnyZodObject;
  body?: AnyZodObject;
}

export const validateWithZod = ({ params, query, body }: Schema) => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      params?.parse(req.params);
      query?.parse(req.query);
      body?.parse(req.body);

      return next(); // Pass ok
    } catch (err) {
      if (err instanceof ZodError) {
        const details = err.errors.map((issue: ZodIssue) => ({
          path: `${issue.path.join('.')}`,
          message: issue.message,
        }));

        const zodError = new HttpError(
          HTTP_STATUS.UNPROCESSABLE,
          'Invalid inputs',
          details,
        );

        // Pass zod error
        return next(zodError);
      }

      // Pass error
      return next(err);
    }
  };
};
