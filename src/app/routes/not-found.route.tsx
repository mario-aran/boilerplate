import { Button } from '@/components/shadcn-ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export const NotFoundRoute = () => {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-xs space-y-4 text-center">
        <h1 className="text-4xl font-semibold">404</h1>

        <h2 className="text-xl font-semibold">Page Not Found</h2>

        <p className="text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>

        <Button asChild className="w-full">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
};
