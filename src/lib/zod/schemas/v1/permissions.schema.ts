import { HTTP_STATUS } from '@/constants/http-status';
import { OPENAPI_PATHS } from '@/constants/routes';
import { z } from '@/lib/zod';
import { registryV1 } from '@/lib/zod/openapi/registries';
import {
  dateTime,
  positiveNumber,
  sortPermissions,
  textId,
} from '@/lib/zod/utils/fields';
import { invalidInputsResponse } from '@/lib/zod/utils/openapi-responses';

// Types
export type GetAllPermissions = z.infer<typeof getAllPermissionsSchema>;

// Fields
const sort = sortPermissions;
const limit = positiveNumber;
const page = positiveNumber;
const id = textId;
const createdAt = dateTime;
const updatedAt = dateTime;

// Schemas
export const getAllPermissionsSchema = z
  .object({ sort, limit, page })
  .partial();

const permissionResponseSchema = z.object({ id, createdAt, updatedAt });

// OpenAPI registries
const tags = ['permissions'];

registryV1.registerPath({
  tags,
  method: 'get',
  path: OPENAPI_PATHS.PERMISSIONS,
  summary: 'Get all permissions',
  request: { query: getAllPermissionsSchema },
  responses: {
    [HTTP_STATUS.OK]: {
      description: 'Array of permission objects',
      content: {
        'application/json': { schema: permissionResponseSchema.array() },
      },
    },
    [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
  },
});
