import { Outlet } from 'react-router';
import { Footer } from './footer';
import { Header } from './header';

export const DefaultLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto flex flex-1 flex-col border-x p-6">
        {/* "react-router" */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
