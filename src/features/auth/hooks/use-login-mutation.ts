import { login } from '@/features/auth/api';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
