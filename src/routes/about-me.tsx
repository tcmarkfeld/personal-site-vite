import { About } from '@/pages/About/About';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about-me')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-[100vh] w-screen max-w-screen flex-col gap-4 overflow-hidden p-4">
      <About />
    </div>
  );
}
