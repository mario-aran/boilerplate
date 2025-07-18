import { PORT } from '@/config/env';
import { StatusCodes } from 'http-status-codes';
import { BEARER_AUTH_COMPONENT } from './constants/components';
import { pathsV1 } from './paths/v1';

// Types
type Paths = Record<string, unknown>;

interface SwaggerDocumentProps {
  apiVersion: string;
  paths: Paths;
}

// Utils
class SwaggerDocumentGenerator {
  private apiVersion: string;
  private paths: Paths;

  constructor({ apiVersion, paths }: SwaggerDocumentProps) {
    this.apiVersion = apiVersion;
    this.paths = paths;
  }

  public generateDocument = () => ({
    // Base
    openapi: '3.1.0',
    info: {
      title: 'My API',
      description: `API documentation for version ${this.apiVersion}`,
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/${this.apiVersion}`,
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
        [StatusCodes.NOT_FOUND]: this.generateMessageResponse('Data not found'),
        [StatusCodes.UNAUTHORIZED]: this.generateMessageResponse(
          'Invalid credentials',
        ),
        [StatusCodes.UNPROCESSABLE_ENTITY]:
          this.generateUnprocessableResponse(),
      },
    },

    // Paths
    paths: this.paths,
  });

  private generateUnprocessableResponse = () => ({
    description: 'Object with message and validation errors',
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
  });

  private generateMessageResponse = (example: string) => ({
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
}

// Swagger documents
export const swaggerDocumentV1 = new SwaggerDocumentGenerator({
  apiVersion: 'v1',
  paths: pathsV1,
}).generateDocument();
