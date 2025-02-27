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
import { useRecipesQuery } from '@/features/recipes/api';
import { HTMLProps, PropsWithChildren } from 'react';

// Internal components
const CardsGrid = ({ children }: PropsWithChildren) => (
  <div className="grid gap-x-16 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
    {children}
  </div>
);

const CustomCard = ({
  children,
  ...props
}: PropsWithChildren<HTMLProps<HTMLDivElement>>) => (
  <Card className="flex min-w-80 flex-col items-center text-center" {...props}>
    {children}
  </Card>
);

// Exported component
export const RecipesCards = () => {
  // "react-query"
  const { data, isLoading } = useRecipesQuery();
  const recipes = data?.recipes ?? [];

  // Render skeleton
  if (isLoading)
    return (
      <CardsGrid>
        {Array.from({ length: 3 }).map((_, index) => (
          <CustomCard key={index} data-testid="skeleton-card">
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
          </CustomCard>
        ))}
      </CardsGrid>
    );

  // Render cards
  if (!isLoading && recipes.length > 0)
    return (
      <CardsGrid>
        {recipes.map((recipe) => (
          <CustomCard key={recipe.id} data-testid="recipe-card">
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
              <CardDescription>{`${recipe.cookTimeMinutes} mins to cook.`}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                alt={recipe.name}
                src={recipe.image}
                className="h-40 w-40 rounded-md object-cover"
              />
            </CardContent>
            <CardFooter>
              <Button>View Recipe</Button>
            </CardFooter>
          </CustomCard>
        ))}
      </CardsGrid>
    );

  // Render no data
  return <p className="text-center">No recipes found.</p>;
};
