import { ROUTES } from '@/Navigation/routeEnum';
import { useNavigate } from '@tanstack/react-router';

interface FooterProps {
  currentPage: string;
}

export function Footer({ currentPage }: FooterProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-terminal border-border flex items-center justify-start border-t px-2 text-sm">
      <p className="border-border border-r px-2 py-1">{'TM >'}</p>
      {Object.values(ROUTES)
        .filter((val) => val !== ROUTES.NOT_FOUND)
        .map((tab) => (
          <div
            key={tab}
            onClick={() => navigate({ to: tab })}
            className={`border-border cursor-pointer border-r px-4 py-1 ${
              tab === currentPage
                ? 'text-terminal-yellow bg-terminal-active-bg font-bold'
                : 'text-terminal-text'
            }`}
          >
            {tab}
          </div>
        ))}
    </div>
  );
}
