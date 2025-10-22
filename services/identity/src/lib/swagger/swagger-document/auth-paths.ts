import { SWAGGER_PATHS } from '@/constants/paths';

const tags = ['auth'];

export const authPaths = {
  [SWAGGER_PATHS.AUTH_VERIFY_EMAIL]: {
    get: {
      tags,
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
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {},
            },
          },
        },
      },
      responses: {},
    },
  },

  [SWAGGER_PATHS.AUTH_RESEND_EMAIL_VERIFICATION]: {
    post: {
      tags,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {},
            },
          },
        },
      },
      responses: {},
    },
  },

  [SWAGGER_PATHS.AUTH_LOGIN]: {
    post: {
      tags,
      requestBody: {
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
      responses: {},
    },
  },
};
