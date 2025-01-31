import { Outlet } from 'react-router';

export const PublicLayout = () => {
  return (
    <main className="container mx-auto px-4">
      {/* Nested route */}
      <Outlet />
    </main>
  );
};
