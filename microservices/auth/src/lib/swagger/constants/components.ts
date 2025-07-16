import { HTTP_STATUS } from '@/constants/http-status';

export const BEARER_AUTH_COMPONENT = 'bearerAuth';
export const SECURITY = [{ [BEARER_AUTH_COMPONENT]: [] }] as const;

const responsePath = '#/components/responses';
export const RESPONSES = {
  NOT_FOUND: { $ref: `${responsePath}/${HTTP_STATUS.NOT_FOUND}` },
  UNAUTHORIZED: { $ref: `${responsePath}/${HTTP_STATUS.UNAUTHORIZED}` },
  UNPROCESSABLE: { $ref: `${responsePath}/${HTTP_STATUS.UNPROCESSABLE}` },
} as const;
