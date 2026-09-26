import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { CommandMenu } from '@/components/CommandMenu';
import { SiteEffects } from '@/components/SiteEffects';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <CommandMenu />
      <SiteEffects />
      {import.meta.env.MODE === 'development' && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </>
  ),
});
