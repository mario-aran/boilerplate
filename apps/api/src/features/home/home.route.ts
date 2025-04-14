import { Router } from 'express';

const homeRoute = Router();

// Route definitions
homeRoute.get('/', (_, res) => {
  res.json({ message: 'Hello API' });
});

export { homeRoute };
