import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

const TIMELINE_COLOR_STOPS = [
  { progress: 0, red: 230, green: 184, blue: 0 },
  { progress: 0.46, red: 82, green: 136, blue: 246 },
  { progress: 1, red: 95, green: 207, blue: 163 },
] as const;

export function getTimelineColor(progress: number) {
  const clampedProgress = clamp01(progress);
  const upperStop =
    TIMELINE_COLOR_STOPS.find((stop) => stop.progress >= clampedProgress) ??
    TIMELINE_COLOR_STOPS[TIMELINE_COLOR_STOPS.length - 1];
  const lowerStopIndex = Math.max(
    TIMELINE_COLOR_STOPS.indexOf(upperStop) - 1,
    0,
  );
  const lowerStop = TIMELINE_COLOR_STOPS[lowerStopIndex];
  const stopRange = Math.max(upperStop.progress - lowerStop.progress, 0.01);
  const stopProgress = (clampedProgress - lowerStop.progress) / stopRange;
  const red = Math.round(
    lowerStop.red + (upperStop.red - lowerStop.red) * stopProgress,
  );
  const green = Math.round(
    lowerStop.green + (upperStop.green - lowerStop.green) * stopProgress,
  );
  const blue = Math.round(
    lowerStop.blue + (upperStop.blue - lowerStop.blue) * stopProgress,
  );

  return `rgb(${red}, ${green}, ${blue})`;
}

export function revealVisibleElements() {
  const viewportHeight = window.innerHeight;

  document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => {
    if (element.classList.contains('reveal-visible')) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const isNearViewport = rect.top < viewportHeight * 1.12 && rect.bottom > 0;

    if (isNearViewport) {
      element.classList.add('reveal-visible');
    }
  });
}

export function revealSection(sectionId: string) {
  if (sectionId === 'top') {
    revealVisibleElements();
    return;
  }

  const section = document.getElementById(sectionId);

  if (!section) {
    revealVisibleElements();
    return;
  }

  section.querySelectorAll<HTMLElement>('.reveal').forEach((element) => {
    element.style.transitionDelay = '0ms';
    element.classList.add('reveal-visible');
  });
}