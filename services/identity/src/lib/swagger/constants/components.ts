import { StatusCodes } from 'http-status-codes';

export const BEARER_AUTH_COMPONENT = 'bearerAuth';
export const SECURITY = [{ [BEARER_AUTH_COMPONENT]: [] }] as const;

const responsePath = '#/components/responses';
export const RESPONSES = {
  NOT_FOUND: { $ref: `${responsePath}/${StatusCodes.NOT_FOUND}` },
  UNAUTHORIZED: { $ref: `${responsePath}/${StatusCodes.UNAUTHORIZED}` },
  UNPROCESSABLE: {
    $ref: `${responsePath}/${StatusCodes.UNPROCESSABLE_ENTITY}`,
  },
} as const;
