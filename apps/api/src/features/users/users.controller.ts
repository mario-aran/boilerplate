import { Response } from 'express';
import {
  GetAllRequest,
  GetRequest,
  UpdatePasswordRequest,
  UpdateRequest,
  UpdateRoleRequest,
} from './users.zod';

export const usersController = {
  getAll: async (req: GetAllRequest, res: Response) => {
    const { limit } = req.query;

    res.json({ limit });
  },
  get: async (req: GetRequest, res: Response) => {
    const { id } = req.params;

    res.json({ id });
  },
  update: async (req: UpdateRequest, res: Response) => {
    const { id } = req.params;
    const { userName, email } = req.body;

    res.json({ id, userName, email });
  },
  updateRole: async (req: UpdateRoleRequest, res: Response) => {
    const { id } = req.params;
    const { roleId } = req.body;

    res.json({ id, roleId });
  },
  updatePassword: async (req: UpdatePasswordRequest, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;

    res.json({ id, password });
  },
};
