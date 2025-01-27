import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const App = () => {
  return (
    <main>
      <div className="container-2xl mx-auto px-4 border-2 border-black">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <p className="mt-4">Hola!</p>
      </div>

      <div className="bg-green-500 text-white mx-auto p-4">Megaman</div>
      <div className="bg-blue-500 text-white mx-auto p-4 mt-4">Megaman</div>

      <h2 className="text-center text-green-500">GeeksForGeeks</h2>

      <div className="flex flex-row">
        <div className="basis-1/4">01</div>
        <div className="basis-1/4">02</div>
        <div className="basis-1/2">03</div>
      </div>

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
    </main>
  );
};
