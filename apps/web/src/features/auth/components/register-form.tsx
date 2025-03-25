import { FormFieldInput } from '@/components/custom-ui/form-field-input';
import { Button } from '@/components/shadcn-ui/button';
import { DialogFooter } from '@/components/shadcn-ui/dialog';
import { Form } from '@/components/shadcn-ui/form';
import { useLoginMutation } from '@/features/auth/api/use-login-mutation';
import { registerSchema, RegisterSchema } from '@/features/auth/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Constants
const REGISTER_DEFAULT_VALUES: RegisterSchema = {
  email: '',
  username: '',
  password: '',
} as const;

// Initial values
const registerInputs = Object.keys(
  REGISTER_DEFAULT_VALUES,
) as (keyof RegisterSchema)[];

export const RegisterForm = () => {
  // "react-hook-form"
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: REGISTER_DEFAULT_VALUES,
  });

  // "tanstack-query"
  const loginMutation = useLoginMutation();

  // Utils
  const onSubmit = ({ username, password }: RegisterSchema) =>
    loginMutation.mutate({ username, password });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {registerInputs.map((input) => (
          <FormFieldInput key={input} input={input} control={form.control} />
        ))}

        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
