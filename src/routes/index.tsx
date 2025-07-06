import { createFileRoute } from '@tanstack/react-router';
import { ROUTES } from '@/Navigation/routeEnum';
import { Home } from '@/pages/Home/Home';

export const Route = createFileRoute(ROUTES.HOME)({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="flex h-[100vh] w-screen max-w-screen flex-col gap-4 overflow-hidden p-4">
      <Home />
    </div>
  );
}
