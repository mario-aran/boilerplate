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
const RecipesCardsLayout = ({ children }: PropsWithChildren) => (
  <div className="flex flex-wrap gap-8 justify-center">{children}</div>
);

const CardLayout = ({ children }: PropsWithChildren) => (
  <Card className="flex flex-col h-full w-80 items-center justify-center">
    {children}
  </Card>
);

// Main component
export const RecipesCards = () => {
  const { data, isLoading } = useRecipesQuery();
  const recipes = data?.recipes ?? [];

  // Skeleton
  if (isLoading)
    return (
      <RecipesCardsLayout>
        {Array.from({ length: 3 }).map((_, index) => (
          <CardLayout key={index}>
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
          </CardLayout>
        ))}
      </RecipesCardsLayout>
    );

  // Cards
  if (recipes.length > 0)
    return (
      <RecipesCardsLayout>
        {recipes.map((recipe) => (
          <CardLayout key={recipe.id}>
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
              <CardDescription>{`${recipe.cookTimeMinutes} mins to cook.`}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-40 h-40 rounded-md object-cover"
              />
            </CardContent>
            <CardFooter>
              <Button>View Recipe</Button>
            </CardFooter>
          </CardLayout>
        ))}
      </RecipesCardsLayout>
    );

  // No recipes
  return (
    <RecipesCardsLayout>
      <p>No recipes found.</p>
    </RecipesCardsLayout>
  );
};
