import { Link, useLocation } from '@tanstack/react-router';
import { Command, House, Moon, NotebookPen, Sun } from 'lucide-react';
import { ROUTES } from '@/Navigation/routeEnum';
import { menuShortcut, setSiteState } from '@/lib/siteState';
import { setDarkTheme, useDarkTheme } from '@/lib/theme';

// A floating pill of icon buttons, pinned to the top of every page.
export function SiteHeader() {
  const dark = useDarkTheme();
  const { pathname } = useLocation();
  const themeLabel = dark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className="pill-nav">
      <nav aria-label="Main navigation">
        <Link
          to={ROUTES.HOME}
          hash="top"
          aria-label="Home"
          data-tip="Home"
          aria-current={pathname === ROUTES.HOME ? 'page' : undefined}
          viewTransition
        >
          <House size={15} />
        </Link>
        <Link
          to={ROUTES.BLOG}
          aria-label="Blog"
          data-tip="Blog"
          aria-current={pathname.startsWith(ROUTES.BLOG) ? 'page' : undefined}
          viewTransition
        >
          <NotebookPen size={15} />
        </Link>
      </nav>
      <span className="pill-divider" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setSiteState({ menu: true })}
        aria-label="Open command menu"
        aria-keyshortcuts="Meta+K Control+K"
        data-tip={menuShortcut}
      >
        <Command size={15} />
      </button>
      <button
        type="button"
        onClick={() => setDarkTheme(!dark)}
        aria-label={themeLabel}
        aria-pressed={dark}
        data-tip={dark ? 'Light' : 'Dark'}
      >
        {dark ? <Sun size={15} /> : <Moon size={15} />}
      </button>
    </header>
  );
}
