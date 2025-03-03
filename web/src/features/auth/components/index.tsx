import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { PropsWithChildren } from 'react';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

// Internal components
const CustomDialog = ({
  children,
  title,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button className="w-full">{title}</Button>
      </DialogTrigger>

      {/* Dialog */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

// Exported component
export const AuthOptions = () => {
  return (
    <div className="w-full max-w-md space-y-4 p-6 text-center">
      <p className="text-2xl font-medium">Join today.</p>

      <CustomDialog title="Register">
        <RegisterForm />
      </CustomDialog>

      <CustomDialog title="Sign in">
        <LoginForm />
      </CustomDialog>
    </div>
  );
};
