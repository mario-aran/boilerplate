import { Navigate, Outlet } from 'react-router';
import { MainNavbar } from './main-navbar';

const user = true;

export const AuthLayout = () => {
  if (!user) return <Navigate to="/" replace />;

  return (
    <>
      <header>
        <MainNavbar />
      </header>

      <main className="container mx-auto px-4">
        {/* Nested route */}
        <Outlet />
      </main>
    </>
  );
};
