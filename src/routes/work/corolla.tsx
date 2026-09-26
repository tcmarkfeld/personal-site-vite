import { createFileRoute } from '@tanstack/react-router';
import { ROUTES } from '@/Navigation/routeEnum';
import { CorollaCaseStudy } from '@/pages/CaseStudy/CorollaCaseStudy';

export const Route = createFileRoute(ROUTES.COROLLA)({
  component: CorollaCaseStudy,
});
