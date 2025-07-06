export const ROUTES = {
  HOME: '/',
  EXPERIENCE: '/experience',
  ABOUT: '/about-me',
  NOT_FOUND: '/404',
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
