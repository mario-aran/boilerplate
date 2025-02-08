import { Outlet } from 'react-router';
import { AppBar } from './app-bar';
import { Footer } from './footer';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen container mx-auto flex flex-col">
      <AppBar />

      <main className="flex-1 p-6">
        {/* Nested routes */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
