/* eslint-disable @typescript-eslint/no-require-imports */

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

// Initialize registries
export const registryV1 = new OpenAPIRegistry();

// Load zod schema registry definitions synchronously
require('@/lib/zod/schemas/v1');
