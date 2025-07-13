import { ROUTES } from '@/Navigation/routeEnum';
import { useNavigate } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

interface FooterProps {
  currentPage: string;
}

export function Footer({ currentPage }: FooterProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-terminal border-terminal-border flex items-center justify-start border-t px-2 text-sm">
      <p className="border-terminal-border border-r py-1 pr-2">TM</p>
      {Object.values(ROUTES)
        .filter((val) => val !== ROUTES.NOT_FOUND && val !== ROUTES.ABOUT)
        .map((tab, index) => (
          <div
            key={tab}
            onClick={() => navigate({ to: tab })}
            className={`flex cursor-pointer items-center px-4 py-1 ${
              tab === currentPage
                ? 'text-terminal-yellow bg-terminal-active-bg font-bold'
                : 'text-terminal-text'
            }`}
          >
            {index} <ChevronRight size={20} />{' '}
            {tab === '/' ? 'home' : tab.replace('/', '')}
          </div>
        ))}
    </div>
  );
}
