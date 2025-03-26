import { Request, Response, Router } from 'express';

export const homeRoute = Router();

// Define routes here
homeRoute.get('/', (_: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});
