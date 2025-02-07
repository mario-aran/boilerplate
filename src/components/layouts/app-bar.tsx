import { ModeToggle } from '@/components/controls/mode-toggle';
import { ROUTES } from '@/constants/routes';
import { NavLink } from 'react-router';

// Initial values
const navRoutes = [
  { path: '/', name: 'Home' },
  { path: ROUTES.USERS, name: 'Users' },
  { path: ROUTES.RECIPES, name: 'Recipes' },
];

export const AppBar = () => {
  return (
    <header className="container mx-auto px-4 py-2 sticky top-0 border border-solid backdrop-blur-md">
      <div className="flex justify-between">
        {/* Routes */}
        <nav className="flex items-center gap-6 text-sm">
          {navRoutes.map(({ path, name }) => (
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
