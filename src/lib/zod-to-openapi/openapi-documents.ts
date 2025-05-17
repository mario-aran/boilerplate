import { SERVER_PORT } from '@/config/env';
import { ROUTES_V1 } from '@/constants/routes';
import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { registryV1 } from './registries/v1';

// Generators
const generatorV1 = new OpenApiGeneratorV31(registryV1.definitions);

// OpenAPI documents
export const openAPIDocumentV1 = generatorV1.generateDocument({
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'My API',
    description: 'This is the API',
  },
  servers: [
    {
      url: `http://localhost:${SERVER_PORT}${ROUTES_V1.API}`,
      description: 'development',
    },
  ],
});
