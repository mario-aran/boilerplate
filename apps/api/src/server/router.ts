import { Request, Response, Router } from 'express';
import { authRoute } from '../features/auth/auth.route';
import { usersRoute } from '../features/users/users.route';

const router = Router();

// Local routes
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello API' });
});

// Imported routes: Combine and declare paths
router.use('/auth', authRoute);
router.use('/users', usersRoute);

export { router };
