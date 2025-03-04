import { Toaster } from '@/components/shadcn-ui/sonner';
import { ThemeProvider } from '@/lib/shadcn/theme-provider';
import { TanstackQueryProvider } from '@/lib/tanstack/tanstack-query-provider';
import { PropsWithChildren } from 'react';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <TanstackQueryProvider>
      <ThemeProvider>
        {children}

        {/* Toast notifications */}
        <Toaster />
      </ThemeProvider>
    </TanstackQueryProvider>
  );
};
