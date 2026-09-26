export const ROUTES = {
  COROLLA: '/work/corolla',
  HOME: '/',
  NOT_FOUND: '/404',
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
