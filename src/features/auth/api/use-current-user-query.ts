import { VITE_API_URL } from '@/config/env';
import { LoginApiResponse } from '@/features/auth/types';
import { useQuery } from '@tanstack/react-query';

// Constants
const API_URL = `${VITE_API_URL}/auth/me`;

// Utils
const getCurrentAuthUserApi = async (
  accessToken: string,
): Promise<LoginApiResponse> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });

  return response.json();
};

export const useCurrentUserQuery = (accessToken: string) => {
  // "tanstack-query"
  return useQuery({
    queryKey: ['current-auth-user', accessToken],
    queryFn: () => getCurrentAuthUserApi(accessToken),
  });
};
