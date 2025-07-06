import { useNavigate } from '@tanstack/react-router';
import { Separator } from '@radix-ui/react-separator';
import { Button } from './ui/button';
import { ROUTES } from '@/Navigation/routeEnum';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="bg-secondary fixed top-0 right-0 left-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Separator orientation="vertical" className="mr-2 h-4" />
        {/* <FirmPilotLogoBlack width={160} /> */}
        <Button variant="outline" onClick={() => navigate({ to: ROUTES.HOME })}>
          Home
        </Button>
      </div>
    </header>
  );
}
