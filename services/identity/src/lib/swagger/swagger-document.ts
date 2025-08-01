import { BASE_URL } from '@/config/env';
import { BEARER_AUTH } from '@/lib/swagger/constants';
import { StatusCodes } from 'http-status-codes';
import {
  getMessageResponse,
  getUnprocessableResponse,
} from './utils/get-responses';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  servers: [{ url: `${BASE_URL}/api` }],
  components: {
    securitySchemes: {
      [BEARER_AUTH]: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    responses: {
      [StatusCodes.NOT_FOUND]: getMessageResponse('Data not found'),
      [StatusCodes.UNAUTHORIZED]: getMessageResponse('Invalid credentials'),
      [StatusCodes.UNPROCESSABLE_ENTITY]: getUnprocessableResponse(),
    },
  },
  paths: {},
};
