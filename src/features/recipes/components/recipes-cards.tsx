import { Button } from '@/components/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { useRecipesQuery } from '@/features/recipes/hooks';

export const RecipesCards = () => {
  const { data } = useRecipesQuery();
  const recipes = data?.recipes ?? [];

  return (
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
  );
};
