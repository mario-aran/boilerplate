import { Button } from '@/components/shadcn-ui/button';
import { DialogFooter } from '@/components/shadcn-ui/dialog';
import { Form } from '@/components/shadcn-ui/form';
import { useLoginMutation } from '@/features/auth/api';
import { loginSchema, LoginSchema } from '@/features/auth/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormFieldInput } from './form-field-input';

// Constants
const LOGIN_DEFAULT_VALUES: LoginSchema = {
  username: '',
  password: '',
} as const;

// Initial values
const loginInputs = Object.keys(LOGIN_DEFAULT_VALUES) as (keyof LoginSchema)[];

export const LoginForm = () => {
  // "react-hook-form"
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });

  // "tanstack-query"
  const loginMutation = useLoginMutation();

  // Utils
  const onSubmit = (values: LoginSchema) => loginMutation.mutate(values);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {loginInputs.map((input) => (
          <FormFieldInput key={input} input={input} control={form.control} />
        ))}

        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
