import { Button } from '@/components/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { useRecipesQuery } from '@/features/recipes/hooks';
import { PropsWithChildren } from 'react';

// UI components
const CardsGrid = ({ children }: PropsWithChildren) => (
  <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">{children}</div>
);

const CardWrapper = ({ children }: PropsWithChildren) => (
  <Card className="flex min-w-80 flex-col items-center text-center">
    {children}
  </Card>
);

// Main component
export const RecipesCards = () => {
  const { data, isLoading } = useRecipesQuery();
  const recipes = data?.recipes ?? [];

  // No data
  if (!isLoading && recipes.length === 0)
    return <p className="text-center">No recipes found.</p>;

  // Skeleton
  if (isLoading)
    return (
      <CardsGrid>
        {Array.from({ length: 3 }).map((_, index) => (
          <CardWrapper key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-60" />
              <Skeleton className="h-4 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-40 rounded-md" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-28" />
            </CardFooter>
          </CardWrapper>
        ))}
      </CardsGrid>
    );

  // Cards
  return (
    <CardsGrid>
      {recipes.map((recipe) => (
        <CardWrapper key={recipe.id}>
          <CardHeader>
            <CardTitle>{recipe.name}</CardTitle>
            <CardDescription>{`${recipe.cookTimeMinutes} mins to cook.`}</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-40 w-40 rounded-md object-cover"
            />
          </CardContent>
          <CardFooter>
            <Button>View Recipe</Button>
          </CardFooter>
        </CardWrapper>
      ))}
    </CardsGrid>
  );
};
