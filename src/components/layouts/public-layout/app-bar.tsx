import { ModeToggle } from '@/components/controls/mode-toggle';
import { ROUTES } from '@/constants/routes';
import { NavLink } from 'react-router';

// Constants
const NAV_ROUTES = [
  { path: '/', name: 'Home' },
  { path: ROUTES.RECIPES, name: 'Recipes' },
] as const;

export const AppBar = () => {
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between border-x px-4 py-2 text-sm">
        {/* Routes */}
        <nav className="space-x-2">
          {NAV_ROUTES.map(({ path, name }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) => {
                const activeClass = isActive
                  ? 'text-foreground'
                  : 'text-foreground/80';
                return `transition-colors hover:text-foreground/80 ${activeClass}`;
              }}
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
