import { BASE_URL } from '@/config/env';
import { BEARER_AUTH } from '@/lib/swagger/constants';
import {
  generateMessageResponse,
  generateUnprocessableResponse,
} from '@/lib/swagger/utils';
import { StatusCodes } from 'http-status-codes';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  servers: [{ url: `${BASE_URL}/api`, description: 'api' }],
  components: {
    securitySchemes: {
      [BEARER_AUTH]: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    responses: {
      [StatusCodes.NOT_FOUND]: generateMessageResponse('Data not found'),
      [StatusCodes.UNAUTHORIZED]: generateMessageResponse(
        'Invalid credentials',
      ),
      [StatusCodes.UNPROCESSABLE_ENTITY]: generateUnprocessableResponse(),
    },
  },
  paths: {},
};
