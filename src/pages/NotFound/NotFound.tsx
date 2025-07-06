import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Navigation/routeEnum';

export function NotFound() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate({ to: ROUTES.HOME });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <h1 className="text-6xl font-bold">404</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">This page does not exist</p>
          <Button onClick={handleReturnHome} className="w-full">
            Return Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
