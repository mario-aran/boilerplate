// import { usersService } from '@/features/users/users.service';
// import { UserId } from '@/lib/zod/schemas/users.schema';
// import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import { controllerCatchAsync } from './utils';

// export const getUsers = controllerCatchAsync(
//   async (req: Request, res: Response) => {
//     const results = await usersService.getAll(req.query);
//     res.json(results);
//   },
// );

// export const getUser = controllerCatchAsync(
//   async (req: Request<UserId>, res: Response) => {
//     const result = await usersService.get(req.params.id);
//     res.json(result);
//   },
// );

// export const createUser = controllerCatchAsync(
//   async (req: Request, res: Response) => {
//     const result = await usersService.create(req.body);
//     res
//       .status(StatusCodes.CREATED)
//       .json({ message: `User ${result.email} created successfully` });
//   },
// );

// export const updateUser = controllerCatchAsync(
//   async (req: Request<UserId>, res: Response) => {
//     const result = await usersService.update(req.params.id, req.body);
//     res.json({ message: `User ${result.email} updated successfully` });
//   },
// );

// export const updateUserPassword = controllerCatchAsync(
//   async (req: Request<UserId>, res: Response) => {
//     const result = await usersService.updatePassword(req.params, req.body);
//     res.json({
//       message: `Password for user ${result.email} updated successfully`,
//     });
//   },
// );
