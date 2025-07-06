import { createFileRoute } from '@tanstack/react-router';
import { ROUTES } from '@/Navigation/routeEnum';
import { Experience } from '@/pages/WorkExperience/WorkExperience';

export const Route = createFileRoute(ROUTES.EXPERIENCE)({
  component: WorkExperienceComponent,
});

function WorkExperienceComponent() {
  return (
    <div className="flex h-[100vh] w-screen max-w-screen flex-col gap-4 overflow-hidden p-4">
      <Experience />
    </div>
  );
}
