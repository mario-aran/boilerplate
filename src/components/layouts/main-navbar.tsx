import { ModeToggle } from '@/components/controls/mode-toggle';
import { ROUTES } from '@/constants/routes';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import { NavLink } from 'react-router';

// Initial values
const navRoutes = [
  { path: '/', name: 'Home' },
  { path: ROUTES.USERS, name: 'Users' },
  { path: ROUTES.RECIPES, name: 'Recipes' },
];

export const MainNavbar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-4">
        {navRoutes.map(({ path, name }) => (
          <NavigationMenuItem key={name}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive ? 'pointer-events-none' : ''
              }
            >
              {name}
            </NavLink>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
