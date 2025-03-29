import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';

// Constants
const STATUS_UNPROCESSABLE = 422;

export const zodValidate = (schema: AnyZodObject) => {
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

        res.status(STATUS_UNPROCESSABLE).json({
          status: STATUS_UNPROCESSABLE,
          message: 'Invalid data',
          details: errorDetails,
        });

        return; // Stop further execution
      }

      next(err);
    }
  };
};
