import { Request, Response } from 'express';

export const usersController = {
  getAll: (_: Request, res: Response) => {
    res.send('User list');
  },
  get: (_: Request, res: Response) => {
    res.send('User');
  },
  create: (req: Request, res: Response) => {
    res.send(`User created: ${JSON.stringify(req.body)}`);
  },
  update: (req: Request, res: Response) => {
    res.send(`User updated: ${JSON.stringify(req.body)}`);
  },
  delete: (req: Request, res: Response) => {
    res.send(`User deleted: ${req.params.id}`);
  },
};
