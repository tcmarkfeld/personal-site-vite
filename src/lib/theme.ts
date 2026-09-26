import { useSyncExternalStore } from 'react';

const root = document.documentElement;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

export function useDarkTheme() {
  return useSyncExternalStore(subscribe, () => root.dataset.theme === 'dark');
}

export function setDarkTheme(dark: boolean) {
  const theme = dark ? 'dark' : 'light';
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  try {
    window.localStorage.setItem('site-theme', theme);
  } catch {
    // Private windows can block storage; the theme still applies.
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? '#0e0e0e' : '#fbfbfb');
}
