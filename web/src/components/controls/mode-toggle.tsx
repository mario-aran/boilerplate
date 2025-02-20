import { Button } from '@/components/shadcn-ui/button';
import { useTheme } from '@/lib/shadcn/theme-provider';
import { Moon, Sun } from 'lucide-react';

// Constants
const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
} as const;

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  // Utils
  const handleModeChange = () => {
    const isColorDark =
      theme === THEMES.DARK ||
      (theme === THEMES.SYSTEM &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    const newTheme = isColorDark ? THEMES.LIGHT : THEMES.DARK;
    setTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="focus-visible:ring-transparent"
      onClick={handleModeChange}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle mode</span>
    </Button>
  );
};
