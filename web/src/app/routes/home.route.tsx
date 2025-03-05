import { AuthOptions } from '@/features/auth/components';
import { PropsWithChildren } from 'react';

// Internal components
const CenteredSection = ({ children }: PropsWithChildren) => (
  <section className="flex flex-1 flex-col items-center justify-center">
    {children}
  </section>
);

// Exported component
export const HomeRoute = () => {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <CenteredSection>
        <h1 className="text-5xl font-bold">Home</h1>
      </CenteredSection>

      <CenteredSection>
        <AuthOptions />
      </CenteredSection>
    </div>
  );
};
