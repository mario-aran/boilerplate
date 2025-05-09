/* eslint-disable @typescript-eslint/no-require-imports */

import { ROUTES_V1 } from '@/constants/routes';
import {
  OpenApiGeneratorV31,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';

// Registries
export const registryV1 = new OpenAPIRegistry();

// Load schema registry.definitions synchronously
require('@/lib/zod/schemas/v1');

// Generators
const generatorV1 = new OpenApiGeneratorV31(registryV1.definitions);

// OpenAPI docs
export const openAPIDocumentV1 = generatorV1.generateDocument({
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'My API',
    description: 'This is the API',
  },
  servers: [{ url: ROUTES_V1.API }],
});
