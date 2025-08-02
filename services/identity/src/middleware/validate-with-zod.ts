import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodObject } from 'zod';

// Types
interface ValidateWithZodProps {
  params?: ZodObject;
  query?: ZodObject;
  body?: ZodObject;
}

export const validateWithZod =
  ({ params, query, body }: ValidateWithZodProps) =>
  (req: Request, _: Response, next: NextFunction) => {
    try {
      // Validate request data
      params?.parse(req.params);
      query?.parse(req.query);
      body?.parse(req.body);

      // Succeeded
      return next();
    } catch (err) {
      // Failed: zod error
      if (err instanceof ZodError) {
        const validationErrors = err.issues.map((issue) => ({
          field: `${issue.path.join('.')}`,
          message: issue.message,
        }));
        return next(
          new HttpError({
            message: 'Unprocessable',
            httpStatus: StatusCodes.UNPROCESSABLE_ENTITY,
            validationErrors,
          }),
        );
      }

      // Failed: internal error
      return next(err);
    }
  };
