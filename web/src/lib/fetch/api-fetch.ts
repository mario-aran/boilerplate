import { VITE_API_URL } from '@/config/env';

// This will enforce the type argument to be passed every time
export const apiFetch = async <T extends object>(
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

  if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

  return data;
};
