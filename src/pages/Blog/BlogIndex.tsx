import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { blogDescription } from '@/pages/Blog/postMeta';
import { postDate, posts } from '@/pages/Blog/posts';
import { useDarkTheme } from '@/lib/theme';
import { useReveal } from '@/lib/useReveal';
import '@/pages/Home/Home.css';
import './Blog.css';

export function BlogIndex() {
  const dark = useDarkTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  useReveal(pageRef);

  useEffect(() => {
    document.title = 'Blog | Timothy Markfeld';
    return () => {
      document.title = 'Timothy Markfeld | Senior Software Engineer';
    };
  }, []);

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
      <main id="main" className="column blog-index">
        <h1>Blog</h1>
        <p className="blog-lede">{blogDescription}</p>
        <PostList />
      </main>
      <SiteFooter />
    </div>
  );
}

export function PostList() {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug} data-reveal>
          <Link to="/blog/$slug" params={{ slug: post.slug }} viewTransition>
            <img src={post.icon} alt="" width="32" height="32" />
            <span className="post-list-text">
              <strong>{post.title}</strong>
              <span>{post.summary}</span>
            </span>
            <time dateTime={post.date}>
              {postDate.format(new Date(post.date))}
            </time>
            <ArrowRight
              className="post-list-arrow"
              size={14}
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
