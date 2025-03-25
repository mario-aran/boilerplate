// Usage: Render the toaster in the root of your app.

import { Toaster } from '@/components/shadcn-ui/sonner';
import { useTheme } from '@/lib/shadcn/theme-provider';

export const ThemedToaster = () => {
  // "shadcn"
  const { resolvedTheme } = useTheme();

  return <Toaster theme={resolvedTheme} richColors />;
};
