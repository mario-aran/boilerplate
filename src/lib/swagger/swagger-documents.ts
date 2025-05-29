import { SERVER_PORT } from '@/config/env';
import { HTTP_STATUS } from '@/constants/http-status';
import { BEARER_AUTH_COMPONENT } from './constants/components';
import { pathsV1 } from './paths/v1';

// Types
interface GenerateDocumentProps {
  version: string;
  paths: Record<string, unknown>;
}

// Utils
const generateMessageResponse = (example: string) => ({
  description: 'Object with message',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: { message: { type: 'string', example } },
      },
    },
  },
});

const generateDocument = ({ version, paths }: GenerateDocumentProps) => ({
  // Base
  openapi: '3.1.0',
  info: {
    title: 'My API',
    description: `API documentation for version ${version}`,
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${SERVER_PORT}/api/${version}`,
      description: 'development',
    },
  ],

  // Components
  components: {
    securitySchemes: {
      [BEARER_AUTH_COMPONENT]: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    responses: {
      [HTTP_STATUS.NOT_FOUND]: generateMessageResponse('Data not found'),
      [HTTP_STATUS.UNAUTHORIZED]: generateMessageResponse(
        'Invalid credentials',
      ),
      [HTTP_STATUS.UNPROCESSABLE]: {
        description: 'Object with message and validation error details',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Invalid inputs' },
                validationErrors: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: { type: 'string', example: 'id' },
                      message: { type: 'string', example: 'Invalid id format' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  // Paths
  paths,
});

// Swagger documents
export const swaggerDocumentV1 = generateDocument({
  version: 'v1',
  paths: pathsV1,
});
