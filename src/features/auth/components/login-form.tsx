import { Button } from '@/components/shadcn-ui/button';
import { Form } from '@/components/shadcn-ui/form';
import { FormFieldInput } from '@/components/ui/form-field-input';
import { useLoginMutation } from '@/features/auth/api';
import { loginSchema, LoginSchema } from '@/features/auth/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Constants
const INPUTS: (keyof LoginSchema)[] = ['username', 'password'];

export const LoginForm = () => {
  // "react-hook-form"
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: INPUTS.reduce((acc, key) => ({ ...acc, [key]: '' }), {}),
  });

  // "tanstack-query"
  const loginMutation = useLoginMutation();

  // Utils
  const onSubmit = (values: LoginSchema) => loginMutation.mutate(values);

  return (
    <div className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {INPUTS.map((input) => (
            <FormFieldInput key={input} control={form.control} input={input} />
          ))}

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
