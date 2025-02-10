import { Outlet } from 'react-router';

export const EmptyLayout = () => {
  return (
    <main className="container mx-auto flex min-h-screen flex-col p-6">
      {/* "react-router" */}
      <Outlet />
    </main>
  );
};
