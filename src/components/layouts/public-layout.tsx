import { ROUTES } from '@/constants/routes';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import { NavLink, Outlet } from 'react-router';

const navRoutes = [
  { path: '/', name: 'Home' },
  { path: ROUTES.LOGIN, name: 'Login' },
  { path: ROUTES.PRODUCTS, name: 'Products' },
  { path: ROUTES.USERS, name: 'Users' },
];

export const PublicLayout = () => {
  return (
    <>
      {/* Header */}
      <NavigationMenu className="bg-white shadow-md rounded-lg p-4">
        <NavigationMenuList className="flex space-x-4">
          {navRoutes.map(({ path, name }) => (
            <NavigationMenuItem key={name} className="p-2 hover:bg-gray-100">
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

      {/* Content */}
      <main className="container mt-4 mx-auto px-4">
        {/* Nested route */}
        <Outlet />
      </main>
    </>
  );
};
