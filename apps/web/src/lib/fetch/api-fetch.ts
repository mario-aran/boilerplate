import { VITE_API_URL } from '@/config/env';

export const apiFetch = async <T extends object>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const { body, headers, ...rest } = options;

  const response = await fetch(VITE_API_URL + path, {
    ...rest,
    body,
    headers: body
      ? { 'Content-Type': 'application/json', ...headers }
      : headers, // Application/json for body only
  });

  const data = await response.json();

  // Throws an error if the response is not successful
  if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

  return data;
};
