import { Button } from '@/components/shadcn-ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export const NotFoundRoute = () => {
  return (
    <main className="flex items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="font-semibold tracking-tighter text-4xl sm:text-5xl md:text-6xl">
          404
        </h1>

        <h2 className="font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl">
          Page Not Found
        </h2>

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
