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
  { path: ROUTES.LOGIN, name: 'Login' },
  { path: ROUTES.PRODUCTS, name: 'Products' },
  { path: ROUTES.USERS, name: 'Users' },
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};
