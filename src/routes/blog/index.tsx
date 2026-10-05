import { createFileRoute } from '@tanstack/react-router';
import { BlogIndex } from '@/pages/Blog/BlogIndex';

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
});
