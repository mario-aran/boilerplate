import { Outlet } from 'react-router';
import { MainNavbar } from './main-navbar';

export const PublicLayout = () => {
  return (
    <>
      {/* Header */}
      <MainNavbar />

      {/* Content */}
      <main className="container mx-auto px-4">
        {/* Nested route */}
        <Outlet />
      </main>
    </>
  );
};
