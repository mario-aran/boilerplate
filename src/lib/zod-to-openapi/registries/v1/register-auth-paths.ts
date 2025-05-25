import { HTTP_STATUS } from '@/constants/http-status';
import { OPENAPI_PATHS } from '@/lib/zod-to-openapi/constants/openapi-paths';
import { RegisterPathsProps } from '@/lib/zod-to-openapi/types';
import {
  createMessageResponse,
  invalidInputsResponse,
} from '@/lib/zod-to-openapi/utils/responses';
import { loginAuthSchema } from '@/lib/zod/schemas/auth.schema';

export const registerAuthPaths = ({
  registry,
  security,
}: RegisterPathsProps) => {
  const authTags = ['auth'];

  registry.registerPath({
    tags: authTags,
    method: 'post',
    path: OPENAPI_PATHS.AUTH_LOGIN,
    security,
    summary: 'Login user',
    request: {
      body: { content: { 'application/json': { schema: loginAuthSchema } } },
    },
    responses: {
      [HTTP_STATUS.OK]: createMessageResponse(
        'Set jwt cookie and returns a message object',
      ),
      [HTTP_STATUS.UNPROCESSABLE]: invalidInputsResponse,
      [HTTP_STATUS.UNAUTHORIZED]: createMessageResponse(),
    },
  });
};
