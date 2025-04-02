import { Request, Response } from 'express';

export const authController = {
  register: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    res.json({ message: 'User registered successfully' });
  },
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    res.json({ token: 'jwt_token_here' });
  },
  logout: async (req: Request, res: Response) => {
    const token = req.headers['authorization']?.split(' ')[1];

    res.json({ message: 'Logged out successfully' });
  },
  refresh: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    res.json({ newAccessToken: 'new_jwt_token' });
  },
  me: async (req: Request, res: Response) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const user = req.user;

    res.json({ user });
  },
  forgotPassword: async (req: Request, res: Response) => {
    const { email } = req.body;

    res.json({ message: 'Password reset email sent' });
  },
  resetPassword: async (req: Request, res: Response) => {
    const { password, resetToken } = req.body;

    res.json({ message: 'Password reset successfully' });
  },
};
