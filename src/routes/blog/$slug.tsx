import { createFileRoute, notFound } from '@tanstack/react-router';
import { PostPage } from '@/pages/Blog/PostPage';
import { posts } from '@/pages/Blog/posts';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = posts.find(({ slug }) => slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: function PostRoute() {
    return <PostPage post={Route.useLoaderData()} />;
  },
});
