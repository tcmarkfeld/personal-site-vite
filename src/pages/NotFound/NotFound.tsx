import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { ROUTES } from '@/Navigation/routeEnum';
import { useDarkTheme } from '@/lib/theme';
import '@/pages/Home/Home.css';
import './NotFound.css';

export function NotFound() {
  const dark = useDarkTheme();

  return (
    <div className="site lost" data-theme={dark ? 'dark' : 'light'}>
      <SiteHeader />
      <main className="column">
        <div className="lost-sea" aria-hidden="true">
          <svg
            className="lost-boat"
            viewBox="0 0 120 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M58 8v58" />
            <path d="M58 12 26 58h32Z" fill="var(--raised)" />
            <path
              d="M62 20l26 38H62Z"
              fill="var(--accent)"
              stroke="var(--accent)"
            />
            <path d="M14 66h92l-12 14H28Z" fill="var(--raised)" />
          </svg>
          <svg
            className="lost-waves"
            viewBox="0 0 400 24"
            preserveAspectRatio="none"
          >
            <path d="M0 12q25-10 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0" />
          </svg>
        </div>
        <p className="lost-code">404</p>
        <h1>This page drifted out to sea.</h1>
        <p>Nothing’s broken on your end. Let’s get you back to shore.</p>
        <Link className="chip lost-home" to={ROUTES.HOME}>
          <ArrowLeft size={13} aria-hidden="true" /> Back to shore
        </Link>
      </main>
    </div>
  );
}
