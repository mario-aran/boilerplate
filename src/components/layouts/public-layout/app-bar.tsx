import { ModeToggle } from '@/components/controls/mode-toggle';
import { ROUTES } from '@/constants/routes';
import { NavLink } from 'react-router';

// Constants
const NAV_ROUTES = [
  { path: '/', name: 'Home' },
  { path: ROUTES.USERS, name: 'Users' },
  { path: ROUTES.RECIPES, name: 'Recipes' },
] as const;

export const AppBar = () => {
  return (
    <header className="sticky top-0 z-50 border border-b px-4 py-2 text-sm backdrop-blur-md">
      <div className="flex items-center justify-between">
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
