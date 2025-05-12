import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

// Registries
export const registryV1 = new OpenAPIRegistry();

// Synchronously load schema registry definitions
/* eslint-disable @typescript-eslint/no-require-imports */
require('@/lib/zod/schemas/v1');
