import { FormFieldInput } from '@/components/custom-ui/form-field-input';
import { Button } from '@/components/shadcn-ui/button';
import { DialogFooter } from '@/components/shadcn-ui/dialog';
import { Form } from '@/components/shadcn-ui/form';
import { useLoginMutation } from '@/features/auth/api/use-login-mutation';
import { LoginZod, loginZod } from '@/features/auth/auth.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Constants
const LOGIN_DEFAULT_VALUES: LoginZod = {
  username: '',
  password: '',
} as const;

// Initial values
const loginInputs = Object.keys(LOGIN_DEFAULT_VALUES) as (keyof LoginZod)[];

export const LoginForm = () => {
  // "react-hook-form"
  const form = useForm<LoginZod>({
    resolver: zodResolver(loginZod),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });

  // "tanstack-query"
  const loginMutation = useLoginMutation();

  // Utils
  const onSubmit = (values: LoginZod) => loginMutation.mutate(values);

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
