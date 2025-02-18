import { LoginDialog } from './login-dialog';
import { RegisterDialog } from './register-dialog';

export const AuthOptions = () => {
  return (
    <div className="w-full max-w-md space-y-4 p-6 text-center">
      <span className="text-2xl font-medium">Join today.</span>

      <RegisterDialog />

      <LoginDialog />
    </div>
  );
};
