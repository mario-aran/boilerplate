import { SERVER_PORT } from '@/config/env';
import { HTTP_STATUS } from '@/constants/http-status';
import { BEARER_AUTH } from '@/lib/swagger/constants/components';

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

export const generateDocument = ({
  version,
  paths,
}: GenerateDocumentProps) => ({
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
      [BEARER_AUTH]: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    responses: {
      [HTTP_STATUS.NOT_FOUND]: generateMessageResponse('Not found'),
      [HTTP_STATUS.UNAUTHORIZED]: generateMessageResponse('Unauthorized'),
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
