import { HTTP_STATUS } from '@/constants/http-status';
import { AnyZodObject, ZodError, ZodIssue } from '@/lib/zod';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

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

      // Pass
      return next();
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

        // Fail: zod error
        return next(zodError);
      }

      // Fail: internal error
      return next(err);
    }
  };
};
