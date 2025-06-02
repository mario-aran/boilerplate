// const tags = ['users'];

export const usersPaths = {};

// //   registry.registerPath({
// //     method: 'get',
// //     path: OPENAPI_PATHS.USERS,
// //     security,
// //     summary: 'Get all users',
// //     request: { query: getAllUsersSchema },
// //     responses: {
// //       [HTTP_STATUS.OK]: {
// //         description: 'Array of user objects',
// //         content: { 'application/json': { schema: usersResponseSchema } },
// //       },
// //       [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
// //     },
// //   });

// //   registry.registerPath({
// //     method: 'get',
// //     path: OPENAPI_PATHS.USERS_ID,
// //     security,
// //     summary: 'Get user',
// //     request: { params: userIdSchema },
// //     responses: {
// //       [HTTP_STATUS.OK]: {
// //         description: 'User object',
// //         content: { 'application/json': { schema: usersResponseSchema } },
// //       },
// //       [HTTP_STATUS.NOT_FOUND]: createMessageResponse(),
// //     },
// //   });

// //   registry.registerPath({
// //     method: 'post',
// //     path: OPENAPI_PATHS.USERS,
// //     summary: 'Create user',
// //     request: {
// //       body: { content: { 'application/json': { schema: createUserSchema } } },
// //     },
// //     responses: {
// //       [HTTP_STATUS.CREATED]: createMessageResponse(),
// //       [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
// //     },
// //   });

// //   registry.registerPath({
// //     method: 'patch',
// //     path: OPENAPI_PATHS.USERS_ID,
// //     security,
// //     summary: 'Update user',
// //     request: {
// //       params: userIdSchema,
// //       body: { content: { 'application/json': { schema: updateUserSchema } } },
// //     },
// //     responses: {
// //       [HTTP_STATUS.OK]: createMessageResponse(),
// //       [HTTP_STATUS.NOT_FOUND]: createMessageResponse(),
// //       [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
// //     },
// //   });

// //   registry.registerPath({
// //     method: 'patch',
// //     path: OPENAPI_PATHS.USERS_ID_PASSWORD,
// //     security,
// //     summary: 'Update user password',
// //     request: {
// //       params: userIdSchema,
// //       body: {
// //         content: { 'application/json': { schema: updateUserPasswordSchema } },
// //       },
// //     },
// //     responses: {
// //       [HTTP_STATUS.OK]: createMessageResponse(),
// //       [HTTP_STATUS.NOT_FOUND]: createMessageResponse(),
// //       [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
// //     },
// //   });
// // };
