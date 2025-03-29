import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue, ZodObject, ZodRawShape } from 'zod';

// Constants
const STATUS_UNPROCESSABLE = 422;

export const zodValidate = <T extends ZodRawShape>(schema: ZodObject<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorDetails = err.errors.map((issue: ZodIssue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));

        return res.status(STATUS_UNPROCESSABLE).json({
          status: STATUS_UNPROCESSABLE,
          message: 'Invalid data',
          details: errorDetails,
        });
      }

      next(err);
    }
  };
};
