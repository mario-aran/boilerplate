import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRecipes } from '@/features/recipes/hooks';

export const Recipes = () => {
  const { data } = useRecipes();
  const recipes = data?.recipes || [];

  return (
    <div className="grid grid-cols-3 gap-8">
      {recipes.map((recipe) => (
        <Card key={recipe.id}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
