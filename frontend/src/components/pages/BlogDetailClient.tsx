'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useApiData } from '@/hooks/use-api-data';
import type { BlogPost } from '@/lib/api-schemas';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import { API_BASE_URL } from '@/lib/api';

interface BlogDetailClientProps {
  post: BlogPost;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  
  // Fetch all blog posts for recent posts and related posts
  const { data: allPosts } = useApiData<BlogPost[]>('/blog', { page_size: 50 });

  // Get full image URL
  const imageUrl = post.image_url?.startsWith('http')
    ? post.image_url
    : post.image_url
    ? `${API_BASE_URL.replace('/api/v1', '')}${post.image_url}`
    : null;

  // Format date
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  // Get recent posts (excluding current post, limit 5)
  const recentPosts = allPosts
    ?.filter(p => p.id !== post.id)
    .slice(0, 5) || [];

  // Get related posts (same category or tags, excluding current, limit 5)
  const relatedPosts = allPosts
    ?.filter(p => {
      if (p.id === post.id) return false;
      if (post.category?.id && p.category?.id === post.category.id) return true;
      if (post.tags && p.tags) {
        return post.tags.some(tag => p.tags.includes(tag));
      }
      return false;
    })
    .slice(0, 5) || [];

  // Get full image URL for related posts
  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith('http')
      ? imageUrl
      : `${API_BASE_URL.replace('/api/v1', '')}${imageUrl}`;
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80';

  return (
    <Section>
      <Container>
        {/* Back to blog link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </Link>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left section - Main content (2 columns) */}
          <div className="lg:col-span-2">
            <article>
              <header className="mb-8">
                {/* Category */}
                {post.category && (
                  <p className="text-green-600 dark:text-green-500 text-sm font-semibold mb-3">
                    {post.category.name}
                  </p>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-6">
                  {post.excerpt}
                </p>

                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-500 dark:text-secondary-400 pb-6 border-b border-secondary-200 dark:border-secondary-700">
                  {post.author_name && (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {post.author_name}
                    </span>
                  )}
                  {formattedDate && (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {formattedDate}
                    </span>
                  )}
                  {post.reading_time > 0 && (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {post.reading_time} min read
                    </span>
                  )}
                </div>
              </header>

              {/* Featured Image */}
              {imageUrl && (
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <p className="text-secondary-600 dark:text-secondary-400 whitespace-pre-wrap">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-6 border-t border-secondary-200 dark:border-secondary-700">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>

          {/* Right section - Blog menu sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-secondary-900/80 rounded-xl p-8">
                <h3 className="text-lg font-bold text-white mb-8">
                  Latest Posts
                </h3>
                <div className="space-y-0">
                  {recentPosts.map((p, index) => (
                    <Link key={p.id} href={`/blog/${p.slug}`}>
                      <div className={`group cursor-pointer py-4 ${
                        index !== recentPosts.length - 1 ? 'border-b border-secondary-600/40' : ''
                      }`}>
                        <p className="text-xs font-semibold text-green-500 mb-3 uppercase tracking-wide">
                          {p.published_at && new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <h4 className="text-sm font-bold text-white group-hover:text-green-400 transition-colors leading-snug">
                          {p.title}
                        </h4>
                        {index !== recentPosts.length - 1 && <div className="mt-4" />}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-secondary-900/80 rounded-xl p-8">
                <h3 className="text-lg font-bold text-white mb-8">
                  Related Posts
                </h3>
                <div className="space-y-0">
                  {relatedPosts.map((p, index) => (
                    <Link key={p.id} href={`/blog/${p.slug}`}>
                      <div className={`group cursor-pointer py-4 ${
                        index !== relatedPosts.length - 1 ? 'border-b border-secondary-600/40' : ''
                      }`}>
                        <p className="text-xs font-semibold text-green-500 mb-3 uppercase tracking-wide">
                          {p.published_at && new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <h4 className="text-sm font-bold text-white group-hover:text-green-400 transition-colors leading-snug">
                          {p.title}
                        </h4>
                        {index !== relatedPosts.length - 1 && <div className="mt-4" />}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </Section>
  );
}
