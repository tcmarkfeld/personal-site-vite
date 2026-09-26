import { useEffect } from 'react';
import { setAmbience } from '@/lib/ambience';
import { getSiteState, setSiteState, useSiteState } from '@/lib/siteState';

const konami = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function SiteEffects() {
  const { sound } = useSiteState();

  useEffect(() => setAmbience(sound), [sound]);

  useEffect(() => {
    let progress = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      progress =
        key === konami[progress] ? progress + 1 : key === konami[0] ? 1 : 0;
      if (progress < konami.length) return;
      progress = 0;
      const storm = getSiteState().sky !== 'storm';
      setSiteState({ sky: storm ? 'storm' : 'live' });
      if (storm) window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return null;
}
