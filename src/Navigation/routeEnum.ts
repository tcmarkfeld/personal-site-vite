export const ROUTES = {
  HOME: '/',
  EXPERIENCE: '/experience',
  NOT_FOUND: '/404',
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
