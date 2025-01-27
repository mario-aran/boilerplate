import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

export const ReactRouter = () => {
  const query = useQuery({
    queryKey: ['recipes'],
    queryFn: () => fetch('https://dummyjson.com/recipes'),
  });

  console.log(query);

  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        <Card>
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
      </div>
    </>
  );
};
