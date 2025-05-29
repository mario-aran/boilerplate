import { HTTP_STATUS } from '@/constants/http-status';
import { RESPONSES } from '@/lib/swagger/constants/components';
import { SWAGGER_PATHS } from '@/lib/swagger/constants/swagger-paths';

const tags = ['auth'];

export const authPaths = {
  [SWAGGER_PATHS.AUTH_LOGIN]: {
    post: {
      tags,
      requestBody: {
        description: 'Credentials',
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
        [HTTP_STATUS.OK]: {
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
        [HTTP_STATUS.UNPROCESSABLE]: RESPONSES.UNPROCESSABLE,
        [HTTP_STATUS.NOT_FOUND]: RESPONSES.NOT_FOUND,
        [HTTP_STATUS.UNAUTHORIZED]: RESPONSES.UNAUTHORIZED,
      },
    },
  },
};
