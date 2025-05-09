import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import * as zod from 'zod';

// Adds .openapi support to zod
extendZodWithOpenApi(zod.z);

// Re-export everything from Zod
export * from 'zod';
