import { createFileRoute } from '@tanstack/react-router';
import { ROUTES } from '@/Navigation/routeEnum';
import { Home } from '@/pages/Home/Home';

export const Route = createFileRoute(ROUTES.HOME)({
  component: HomeComponent,
});

function HomeComponent() {
  return <Home />;
}
