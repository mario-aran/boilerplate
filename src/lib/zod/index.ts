/* eslint-disable no-restricted-imports */

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import * as zod from 'zod';

extendZodWithOpenApi(zod.z); // Adds ".openapi()" support to zod
export * from 'zod'; // Re-export everything from Zod
