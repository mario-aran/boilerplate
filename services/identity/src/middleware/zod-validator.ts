import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodObject } from 'zod';

// Types
type ZodValidator = (props: {
  params?: ZodObject;
  query?: ZodObject;
  body?: ZodObject;
}) => (req: Request, res: Response, next: NextFunction) => void;

export const zodValidator: ZodValidator =
  ({ params, query, body }) =>
  (req, _, next) => {
    try {
      // Validate request data
      params?.parse(req.params);
      query?.parse(req.query);
      body?.parse(req.body);

      // Succeeded
      return next();
    } catch (err) {
      // Failed: Zod error
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

      // Failed: Internal error
      return next(err);
    }
  };
