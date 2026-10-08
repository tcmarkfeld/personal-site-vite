import type { ComponentType } from 'react';
import { postMeta, type PostMeta } from '@/pages/Blog/postMeta';
import { CorollaIceDelivery } from '@/pages/Blog/posts/CorollaIceDelivery';
import { Revise } from '@/pages/Blog/posts/Revise';

export type Post = PostMeta & { Body: ComponentType };

const bodies: Record<string, ComponentType> = {
  'revise': Revise,
  'corolla-ice-delivery': CorollaIceDelivery,
};

export const posts: Post[] = postMeta.map((meta) => ({
  ...meta,
  Body: bodies[meta.slug],
}));

export const postDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
