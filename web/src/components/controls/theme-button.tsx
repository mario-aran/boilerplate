import { Button } from '@/components/shadcn-ui/button';
import { useTheme } from '@/lib/shadcn/theme-provider';
import { Moon, Sun } from 'lucide-react';

// Constants
const DARK = 'dark';

export const ThemeButton = () => {
  // "shadcn"
  const { theme, setTheme } = useTheme();

  // Utils
  const handleThemeClick = () => {
    const isDark =
      theme === DARK ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setTheme(isDark ? 'light' : DARK);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="focus-visible:ring-transparent"
      onClick={handleThemeClick}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Theme button</span>
    </Button>
  );
};
