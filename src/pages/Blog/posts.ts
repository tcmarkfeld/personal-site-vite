import type { ComponentType } from 'react';
import { CorollaIceDelivery } from '@/pages/Blog/posts/CorollaIceDelivery';
import { Revise } from '@/pages/Blog/posts/Revise';

export type Post = {
  slug: string;
  title: string;
  kicker: string;
  icon: string;
  date: string;
  summary: string;
  Body: ComponentType;
};

// Newest first.
export const posts: Post[] = [
  {
    slug: 'revise',
    title: 'Editing a PDF like it’s a doc',
    kicker: 'Revise · Project',
    icon: '/revise/icon.png',
    date: '2026-10-05',
    summary:
      'Why I built Revise, and how it turns a PDF back into something you can actually edit.',
    Body: Revise,
  },
  {
    slug: 'corolla-ice-delivery',
    title: 'Routing ice across the Outer Banks',
    kicker: 'Corolla Ice Delivery · Case study',
    icon: '/corolla_ice_delivery_logo.webp',
    date: '2026-09-26',
    summary:
      'The delivery app I owned from design through both app stores, and the up to three hours it cut from a delivery day.',
    Body: CorollaIceDelivery,
  },
];

export const postDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
