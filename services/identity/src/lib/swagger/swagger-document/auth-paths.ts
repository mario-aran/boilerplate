import { SWAGGER_PATHS } from '@/constants/routes';
import { RESPONSES } from '@/lib/swagger/constants';
import { StatusCodes } from 'http-status-codes';

// Values
const tags = ['auth'];

export const authPaths = {
  [SWAGGER_PATHS.AUTH_VERIFY_EMAIL]: {
    get: {
      tags,
      summary: 'Verify email',
      parameters: [
        {
          in: 'query',
          name: 'token',
          required: true,
          schema: { type: 'string' },
          description: 'Email verification token',
        },
      ],
      responses: {},
    },
  },

  [SWAGGER_PATHS.AUTH_REGISTER]: {
    post: {
      tags,
      summary: 'Register user',
      requestBody: {},
      responses: {},
    },
  },

  [SWAGGER_PATHS.AUTH_RESEND_EMAIL_VERIFICATION]: {
    post: {
      tags,
      summary: 'Resend email verification',
      requestBody: {},
      responses: {},
    },
  },

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
        [StatusCodes.UNPROCESSABLE_ENTITY]: RESPONSES.UNPROCESSABLE_ENTITY,
        [StatusCodes.NOT_FOUND]: RESPONSES.NOT_FOUND,
        [StatusCodes.UNAUTHORIZED]: RESPONSES.UNAUTHORIZED,
      },
    },
  },
};
