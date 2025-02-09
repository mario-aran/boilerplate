import { Button } from '@/components/shadcn-ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export const NotFoundRoute = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl">
          404
        </h1>

        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
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
