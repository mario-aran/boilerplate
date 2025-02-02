import { Outlet } from 'react-router';
import { MainNavbar } from './main-navbar';

export const MainLayout = () => {
  return (
    <>
      {/* Header */}
      <header>
        <MainNavbar />
      </header>

      {/* Content */}
      <main className="container mx-auto px-4">
        {/* Nested route */}
        <Outlet />
      </main>
    </>
  );
};
