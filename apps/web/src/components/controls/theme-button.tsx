import { Button } from '@/components/shadcn-ui/button';
import { useTheme } from '@/lib/shadcn/theme-provider';
import { Moon, Sun } from 'lucide-react';

// Constants
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const ThemeButton = () => {
  // "shadcn"
  const { resolvedTheme, setTheme } = useTheme();

  // Utils
  const handleThemeClick = () =>
    setTheme(resolvedTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);

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
