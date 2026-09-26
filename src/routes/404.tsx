import { createFileRoute } from '@tanstack/react-router';
import { ROUTES } from '@/Navigation/routeEnum';
import { NotFound } from '@/pages/NotFound/NotFound';

export const Route = createFileRoute(ROUTES.NOT_FOUND)({
  component: NotFound,
});
