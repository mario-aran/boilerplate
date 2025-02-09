import { Outlet } from 'react-router';
import { AppBar } from './app-bar';
import { Footer } from './footer';

export const PublicLayout = () => {
  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <AppBar />

      <main className="flex flex-1 flex-col p-6">
        {/* Nested routes */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
