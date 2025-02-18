import { useLoginMutation } from '@/features/auth/api';
import { loginSchema, registerSchema } from '@/features/auth/zod';
import { DialogForm } from './dialog-form';

export const AuthOptions = () => {
  // "tanstack-query"
  const loginMutation = useLoginMutation();

  return (
    <div className="w-full max-w-md space-y-4 p-6 text-center">
      <span className="text-2xl font-medium">Join today.</span>

      <DialogForm
        title="Register"
        schema={registerSchema}
        mutation={loginMutation}
      />

      <DialogForm title="Login" schema={loginSchema} mutation={loginMutation} />
    </div>
  );
};
