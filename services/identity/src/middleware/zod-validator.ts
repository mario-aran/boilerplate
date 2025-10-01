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
  (req, _res, next) => {
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
            status: StatusCodes.UNPROCESSABLE_ENTITY,
            message: 'Unprocessable',
            validationErrors,
          }),
        );
      }

      // Failed: regular error
      return next(err);
    }
  };
