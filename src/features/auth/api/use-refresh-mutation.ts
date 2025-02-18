import { VITE_API_URL } from '@/config/env';
import { useMutation } from '@tanstack/react-query';

// Types
interface RefreshAuthSessionApiResponse {
  accessToken: string;
  refreshToken: string;
}

// Constants
const API_URL = `${VITE_API_URL}/auth/refresh`;

// Utils
const refreshAuthSessionApi = async (
  refreshToken: string,
): Promise<RefreshAuthSessionApiResponse> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken,
      expiresInMins: 30,
    }),
    credentials: 'include',
  });

  return response.json();
};

export const useRefreshMutation = () => {
  // "tanstack-query"
  return useMutation({
    mutationFn: refreshAuthSessionApi,
  });
};
