import { LoginDialog, RegisterDialog } from '@/features/auth/components';
import { PropsWithChildren } from 'react';

// Internal components
const CenteredSection = ({ children }: PropsWithChildren) => {
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      {children}
    </section>
  );
};

export const HomeRoute = () => {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <CenteredSection>
        <h1 className="text-5xl font-bold">Home</h1>
      </CenteredSection>

      <CenteredSection>
        <div className="w-full max-w-md space-y-4 p-6 text-center">
          <span className="text-2xl font-medium">Join today.</span>
          <RegisterDialog />
          <LoginDialog />
        </div>
      </CenteredSection>
    </div>
  );
};
