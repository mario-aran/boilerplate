import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRecipes } from '@/features/recipes/hooks';
import { useState } from 'react';

export const Recipes = () => {
  const [page, setPage] = useState(1);
  const { data } = useRecipes({ page });
  const recipes = data?.recipes || [];

  return (
    <section>
      <div className="grid grid-cols-3 gap-8 place-items-center">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="flex flex-col h-full w-full max-w-80 items-center justify-center"
          >
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
              <CardDescription>
                {recipe.cookTimeMinutes} mins to cook.
              </CardDescription>
            </CardHeader>
            <CardContent className="max-w-64">
              <img src={recipe.image} alt="Recipe Image" />
            </CardContent>
            <CardFooter>
              <Button>View Recipe</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div>Pagination</div>
    </section>
  );
};
