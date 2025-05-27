import { HTTP_STATUS } from '@/constants/http-status';
import { AnyZodObject, ZodError, ZodIssue } from '@/lib/zod';
import { HttpError } from '@/utils/http-error';
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
      // Validate and transform request data
      if (params) req.params = params.parse(req.params);
      if (query) req.query = query.parse(req.query);
      if (body) req.body = body.parse(req.body);

      // Succeeded
      return next();
    } catch (err) {
      // Failed: zod error
      if (err instanceof ZodError) {
        const validationErrors = err.errors.map((issue: ZodIssue) => ({
          field: `${issue.path.join('.')}`,
          message: issue.message,
        }));
        return next(
          new HttpError({
            message: 'Invalid inputs',
            httpStatus: HTTP_STATUS.UNPROCESSABLE,
            validationErrors,
          }),
        );
      }

      // Failed: internal error
      return next(err);
    }
  };
};
