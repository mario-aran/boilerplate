import { ModeToggle } from '@/components/controls/mode-toggle';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/shadcn/utils';
import { NavLink } from 'react-router';

// Constants
const NAV_ROUTES = [
  { path: '/', name: 'Home' },
  { path: ROUTES.RECIPES, name: 'Recipes' },
] as const;

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between border-x px-4 py-2">
        {/* Routes */}
        <nav className="flex items-center gap-4 text-sm xl:gap-6">
          {NAV_ROUTES.map(({ path, name }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                cn(
                  'text-foreground/80 transition-colors hover:text-foreground/80',
                  isActive && 'font-semibold text-foreground',
                )
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Toggles */}
        <ModeToggle />
      </div>
    </header>
  );
};
