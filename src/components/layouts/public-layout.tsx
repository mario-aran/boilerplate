import { Outlet } from 'react-router';
import { AppBar } from './app-bar';

export const PublicLayout = () => {
  return (
    <>
      <AppBar />

      <main className="container mx-auto p-6">
        {/* Nested route */}
        <Outlet />
      </main>
    </>
  );
};
