import { StatusCodes } from 'http-status-codes';

export const BEARER_AUTH = 'bearerAuth';
export const SECURITY = [{ [BEARER_AUTH]: [] }] as const;

const responsePath = '#/components/responses';
export const RESPONSES = {
  NOT_FOUND: { $ref: `${responsePath}/${StatusCodes.NOT_FOUND}` },
  UNAUTHORIZED: { $ref: `${responsePath}/${StatusCodes.UNAUTHORIZED}` },
  UNPROCESSABLE_ENTITY: {
    $ref: `${responsePath}/${StatusCodes.UNPROCESSABLE_ENTITY}`,
  },
} as const;
