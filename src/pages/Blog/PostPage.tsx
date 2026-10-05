import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { ROUTES } from '@/Navigation/routeEnum';
import { postDate, type Post } from '@/pages/Blog/posts';
import { useDarkTheme } from '@/lib/theme';
import { useReveal } from '@/lib/useReveal';
import '@/pages/Home/Home.css';
import './Blog.css';

export function PostPage({ post }: { post: Post }) {
  const dark = useDarkTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  useReveal(pageRef);

  useEffect(() => {
    document.title = `${post.title} | Timothy Markfeld`;
    return () => {
      document.title = 'Timothy Markfeld | Senior Software Engineer';
    };
  }, [post.title]);

  return (
    <div
      className="site post"
      data-theme={dark ? 'dark' : 'light'}
      id="top"
      ref={pageRef}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <div className="edge-fade" aria-hidden="true" />
      <main id="main">
        <header className="column post-intro">
          <Link className="back-link" to={ROUTES.BLOG} viewTransition>
            <ArrowLeft size={13} aria-hidden="true" /> All posts
          </Link>
          <p className="post-kicker">
            <img src={post.icon} alt="" width="20" height="20" />
            {post.kicker}
          </p>
          <h1>{post.title}</h1>
          <time dateTime={post.date}>
            {postDate.format(new Date(post.date))}
          </time>
        </header>
        <post.Body />
      </main>
      <SiteFooter />
    </div>
  );
}
