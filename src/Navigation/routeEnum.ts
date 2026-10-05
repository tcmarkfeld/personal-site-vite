export const ROUTES = {
  BLOG: '/blog',
  COROLLA: '/blog/corolla-ice-delivery',
  HOME: '/',
  NOT_FOUND: '/404',
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
