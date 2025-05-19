import { DatabaseError } from 'pg';

export const isUniqueViolationError = (error: unknown) =>
  error instanceof DatabaseError && error.code === '23505';
