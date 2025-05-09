import { ROUTES_V1 } from '@/constants/routes';
import '@/lib/zod/schemas/v1'; // "zod-to-openapi": Load zod schemas registry.definitions

import {
  OpenApiGeneratorV31,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';

// Registries
export const registryV1 = new OpenAPIRegistry();

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
  servers: [{ url: ROUTES_V1.API }],
});
