import { Outlet } from 'react-router';

export const EmptyLayout = () => {
  return (
    <main className="container mx-auto h-screen p-6">
      {/* Nested routes */}
      <Outlet />
    </main>
  );
};
