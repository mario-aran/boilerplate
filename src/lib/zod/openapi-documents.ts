import { ROUTES_V1 } from '@/constants/routes';
import {
  OpenApiGeneratorV31,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';

// Registries
export const registryV1 = new OpenAPIRegistry();

export const openAPIDocumentV1 = (async () => {
  // Load schemas into registry
  await import('@/lib/zod/schemas/v1');

  const generator = new OpenApiGeneratorV31(registryV1.definitions);

  return generator.generateDocument({
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'My API',
      description: 'This is the API',
    },
    servers: [{ url: ROUTES_V1.API }],
  });
})();
