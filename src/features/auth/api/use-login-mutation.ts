import { VITE_API_URL } from '@/config/env';
import { LoginApiResponse } from '@/features/auth/types';
import { useMutation } from '@tanstack/react-query';

// Types
interface LoginApiCredentials {
  username: string;
  password: string;
}

// Constants
const API_URL = `${VITE_API_URL}/auth/login`;

// Utils
const loginApi = async ({
  username,
  password,
}: LoginApiCredentials): Promise<LoginApiResponse> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
    credentials: 'include',
  });

  return response.json();
};

export const useLoginMutation = () => {
  // "tanstack-query"
  return useMutation({
    mutationFn: loginApi,
  });
};
