/* eslint-disable no-restricted-imports */

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z); // Adds ".openapi()" support to zod
export * from 'zod'; // Re-export everything from Zod
