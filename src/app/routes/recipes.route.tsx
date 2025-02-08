import { Recipes } from '@/features/recipes/components';

export const RecipesRoute = () => {
  return (
    <>
      <h1 className="font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl">
        Recipes
      </h1>

      <Recipes />
    </>
  );
};
