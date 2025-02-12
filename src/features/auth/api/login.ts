import { VITE_API_URL } from '@/config/env';

// Types
interface Credentials {
  username: string;
  email: string;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export const login = async (
  credentials: Credentials,
): Promise<LoginResponse> => {
  const url = `${VITE_API_URL}/auth/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...credentials,
      expiresInMins: 60,
    }),
    credentials: 'include',
  });

  return response.json();
};
