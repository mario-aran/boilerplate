// import { app } from '@/app';
// import { PATHS } from '@/constants/paths';
// import { PERMISSIONS } from '@/constants/permissions';
// import { signAccessToken } from '@/features/auth/utils/jwt-handlers';
// import { permissionsService } from '@/features/permissions/permissions.service';
// import { rolesService } from '@/features/roles/roles.service';
// import { usersService } from '@/features/users/users.service';
// import { setupRealSpy } from '@tests/utils/setup-real-spy';
// import { setupTransactionalDb } from '@tests/utils/setup-transactional-db';
// import { StatusCodes } from 'http-status-codes';
// import request from 'supertest';

// const setupTestUserWithToken = async () => {
//   const role = await rolesService.create({ id: 'test' });
//   const user = await usersService.create({
//     email: 'test@test.com',
//     password: '12345678',
//   });
//   const updatedUser = await usersService.update(user.id, { roleId: role.id });

//   return {
//     ...user,
//     roleId: updatedUser.roleId,
//     token: signAccessToken({ userId: user.id }),
//   };
// };

// describe('permissions', () => {
//   let testUserToken: string;
//   let testUserRoleId: string;

//   setupTransactionalDb();

//   beforeEach(async () => {
//     const createdUser = await usersService.create({
//       email: 'test@test.com',
//       password: '12345678',
//     });
//     testUserToken = signAccessToken({ userId: createdUser.id });

//     const createdRole = await rolesService.create({ id: 'test' });
//     const updatedUser = await usersService.update(createdUser.id, {
//       roleId: createdRole.id,
//     });

//     testUserRoleId = updatedUser.roleId;
//   });

//   describe('GET /permissions', () => {
//     const spyRealGetAllService = setupRealSpy(permissionsService, 'getAll');

//     it('200 no query params', async () => {
//       await rolesService.update(createdRole.id, {
//         permissionIds: [PERMISSIONS.READ_PERMISSIONS],
//       });

//       const getAllService = spyRealGetAllService();

//       const res = await request(app)
//         .get(PATHS.PERMISSIONS)
//         .set('Authorization', `Bearer ${token}`);
//       const getAllServiceResult = await getAllService.mock.results[0].value;

//       expect(res.status).toBe(StatusCodes.OK);
//       expect(res.body).toEqual(getAllServiceResult);
//       expect(getAllService).toHaveBeenCalledOnce();
//       expect(getAllService).toHaveBeenCalledWith({});
//     });

//     it('200 valid query params', async () => {
//       const res = await request(app).get(PATHS.PERMISSIONS).query({
//         limit: 1,
//         page: 1,
//         sort: 'id',
//         search: 'v',
//       });

//       expect(res.status).toBe(StatusCodes.OK);
//     });

//     it('422 invalid query params', async () => {
//       const cases = [
//         { limit: 0 },
//         { page: 0 },
//         { sort: 'invalid' },
//         { search: '' },
//       ];

//       for (const queryParams of cases) {
//         const res = await request(app)
//           .get(PATHS.PERMISSIONS)
//           .query(queryParams);

//         expect(res.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
//       }
//     });
//   });
// });
