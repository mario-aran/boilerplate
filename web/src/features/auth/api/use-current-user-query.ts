import { LoginApiResponse } from '@/features/auth/types';
import { apiFetch } from '@/lib/fetch/api-fetch';
import { useQuery } from '@tanstack/react-query';

// Utils
const getCurrentAuthUserApi = async (accessToken: string) =>
  apiFetch<LoginApiResponse>('/auth/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

// "tanstack"
export const useCurrentUserQuery = (accessToken: string) =>
  useQuery({
    queryKey: ['current-user', accessToken],
    queryFn: () => getCurrentAuthUserApi(accessToken),
  });
