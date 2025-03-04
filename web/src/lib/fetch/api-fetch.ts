import { VITE_API_URL } from '@/config/env';

// Classes
class ApiStatusError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
    this.stack = new Error().stack;
  }
}

export const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const { body, headers, ...rest } = options;

  const response = await fetch(VITE_API_URL + path, {
    ...rest,
    headers: body
      ? { 'Content-Type': 'application/json', ...headers }
      : headers,
    body: body ? body : undefined,
  });

  const data = await response.json();

  if (!response.ok)
    throw new ApiStatusError(
      response.status,
      data.message || `Error ${response.status}`,
    );

  return data;
};
