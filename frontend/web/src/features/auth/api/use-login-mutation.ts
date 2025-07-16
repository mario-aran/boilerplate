import { LoginApiResponse } from '@/features/auth/types';
import { apiFetch } from '@/lib/fetch/api-fetch';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

// Types
interface LoginApiCredentials {
  username: string;
  password: string;
}

// Utils
const loginApi = ({ username, password }: LoginApiCredentials) =>
  apiFetch<LoginApiResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

// "tanstack-query"
export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginApi,
    onError: (error) => {
      toast.error(error.message);
    },
  });
