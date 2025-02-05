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

// Types
interface RecipeCardProps {
  title: string;
  description: string;
  image: string;
}

// UI components
const RecipeCardLayout = ({ children }: PropsWithChildren) => (
  <Card className="flex flex-col h-full w-80 items-center justify-center">
    {children}
  </Card>
);

const SkeletonRecipeCard = () => (
  <RecipeCardLayout>
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
  </RecipeCardLayout>
);

const RecipeCard = ({ title, description, image }: RecipeCardProps) => (
  <RecipeCardLayout>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <img
        src={image}
        alt="Recipe image"
        className="w-40 h-40 rounded-md object-cover"
      />
    </CardContent>
    <CardFooter>
      <Button>View Recipe</Button>
    </CardFooter>
  </RecipeCardLayout>
);

// Main component
export const RecipesCards = () => {
  const { data, isLoading } = useRecipesQuery();
  const recipes = data?.recipes ?? [];

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <SkeletonRecipeCard key={index} />
        ))
      ) : recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.name}
            description={`${recipe.cookTimeMinutes} mins to cook.`}
            image={recipe.image}
          />
        ))
      )}
    </div>
  );
};
