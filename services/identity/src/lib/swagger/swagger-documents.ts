import { PORT } from '@/config/env';
import { StatusCodes } from 'http-status-codes';

// Types
type Paths = Record<string, unknown>;

interface SwaggerDocumentProps {
  paths: Paths;
}

// Utils
class SwaggerDocumentGenerator {
  private paths: Paths;

  constructor({ paths }: SwaggerDocumentProps) {
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
  paths: {},
}).generateDocument();
