import { Request, Response } from 'express';

export const usersController = {
  getAll: async (req: Request, res: Response) => {
    const { limit } = req.query;

    res.json({ limit });
  },
  get: async (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({ id });
  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userName, email } = req.body;

    res.json({ id, userName, email });
  },
  updateRole: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roleId } = req.body;

    res.json({ id, roleId });
  },
  updatePassword: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;

    res.json({ id, password });
  },
};
