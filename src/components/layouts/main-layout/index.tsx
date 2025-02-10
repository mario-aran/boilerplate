import { Outlet } from 'react-router';
import { AppBar } from './app-bar';
import { Footer } from './footer';

export const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <AppBar />

      <main className="container mx-auto flex-grow border-x p-6">
        {/* Nested routes */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
