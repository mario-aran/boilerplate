import { apiFetch } from '@/lib/fetch/api-fetch';
import { useMutation } from '@tanstack/react-query';

// Types
interface RefreshAuthSessionApiResponse {
  accessToken: string;
  refreshToken: string;
}

// Utils
const refreshAuthSessionApi = (refreshToken: string) =>
  apiFetch<RefreshAuthSessionApiResponse>('/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken,
      expiresInMins: 30,
    }),
  });

// "tanstack-query"
export const useRefreshMutation = () =>
  useMutation({
    mutationFn: refreshAuthSessionApi,
  });
