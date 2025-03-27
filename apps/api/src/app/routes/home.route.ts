import { Request, Response, Router } from 'express';

export const homeRoute = Router();

// Route definitions
homeRoute.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});
