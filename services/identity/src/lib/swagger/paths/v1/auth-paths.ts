import { RESPONSES } from '@/lib/swagger/constants/components';
import { SWAGGER_PATHS } from '@/lib/swagger/constants/swagger-paths';
import { StatusCodes } from 'http-status-codes';

const tags = ['auth'];

export const authPaths = {
  [SWAGGER_PATHS.AUTH_LOGIN]: {
    post: {
      tags,
      summary: 'Authenticate user',
      requestBody: {
        description: 'User credentials',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'user@example.com' },
                password: { type: 'string', example: '12345678' },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
      responses: {
        [StatusCodes.OK]: {
          description: 'Object with jwt token',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { token: { type: 'string', example: 'ey...' } },
              },
            },
          },
        },
        [StatusCodes.UNPROCESSABLE_ENTITY]: RESPONSES.UNPROCESSABLE,
        [StatusCodes.NOT_FOUND]: RESPONSES.NOT_FOUND,
        [StatusCodes.UNAUTHORIZED]: RESPONSES.UNAUTHORIZED,
      },
    },
  },
};
