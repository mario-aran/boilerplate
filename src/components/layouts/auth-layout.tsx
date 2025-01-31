import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <main className="container mx-auto px-4">
      {/* Nested route */}
      <Outlet />
    </main>
  );
};
