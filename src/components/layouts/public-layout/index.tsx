import { Outlet } from 'react-router';
import { AppBar } from './app-bar';
import { Footer } from './footer';

export const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <AppBar />

      <main className="container mx-auto flex-1 border-x p-6">
        {/* Nested routes */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
