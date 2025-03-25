import { ThemedToaster } from '@/components/custom-ui/themed-toaster';
import { ThemeProvider } from '@/lib/shadcn/theme-provider';
import { TanstackQueryProvider } from '@/lib/tanstack/tanstack-query-provider';
import { PropsWithChildren } from 'react';

// Translations
import '@/lib/i18next/i18n';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <TanstackQueryProvider>
      <ThemeProvider>
        {children}

        {/* Notifications */}
        <ThemedToaster />
      </ThemeProvider>
    </TanstackQueryProvider>
  );
};
