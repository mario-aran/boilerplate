import { LanguageSelect } from '@/components/controls/language-select';
import { ThemeSwitch } from '@/components/controls/theme-switch';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/shadcn/utils';
import { NavLink } from 'react-router';

// Constants
const NAV_LINKS = [
  { path: '/', name: 'Home' },
  { path: ROUTES.RECIPES, name: 'Recipes' },
] as const;

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex justify-between border-x px-4 py-2">
        {/* Links */}
        <nav className="flex items-center gap-4 text-sm xl:gap-6">
          {NAV_LINKS.map(({ path, name }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                cn(
                  'text-foreground/80 hover:text-foreground/80 transition-colors',
                  isActive && 'text-foreground font-semibold',
                )
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Settings */}
        <div className="flex">
          <LanguageSelect />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};
