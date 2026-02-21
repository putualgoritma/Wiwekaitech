'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useApiData } from '@/hooks/use-api-data';
import type { BlogPost } from '@/lib/api-schemas';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';
import { API_BASE_URL } from '@/lib/api';

export default function BlogPageClient() {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const { data, loading, error } = useApiData<BlogPost[]>('/blog', { page_size: 10 });

  // Get full image URL
  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith('http')
      ? imageUrl
      : `${API_BASE_URL.replace('/api/v1', '')}${imageUrl}`;
  };

  // Fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80';

  return (
    <Section>
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <p className="text-green-600 dark:text-green-500 text-sm font-semibold mb-3">
              {t('subtitle')}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg lg:ml-auto mt-6 lg:mt-10">
            <Image
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80"
              alt="Editorial workspace for articles"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        {loading && (
          <p className="text-center text-secondary-600 dark:text-secondary-400">
            {tCommon('loading')}
          </p>
        )}
        {error && (
          <p className="text-center text-red-500">
            {tCommon('error')}: {error}
          </p>
        )}
        {!loading && !error && (!data || data.length === 0) && (
          <p className="text-center text-secondary-600 dark:text-secondary-400">
            {tCommon('notFound')}
          </p>
        )}

        {data && data.length > 0 && (
          <div className="max-w-4xl mx-auto">
            {data.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block mb-6">
                <Card hover>
                  <div className="grid md:grid-cols-[200px_1fr] gap-4">
                    {/* Thumbnail */}
                    <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden bg-secondary-100 dark:bg-secondary-800">
                      <Image
                        src={getImageUrl(post.image_url) || fallbackImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 md:p-6 flex flex-col justify-between">
                      <div>
                        {post.category && (
                          <p className="text-green-600 dark:text-green-500 text-xs font-semibold mb-2">
                            {post.category.name}
                          </p>
                        )}
                        <h2 className="text-xl md:text-2xl font-semibold text-secondary-900 dark:text-white mb-2 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-secondary-600 dark:text-secondary-400 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400">
                        <span>
                          {post.author_name && `${post.author_name} • `}
                          {post.published_at && new Date(post.published_at).toLocaleDateString()}
                        </span>
                        {post.reading_time > 0 && (
                          <span>{post.reading_time} min read</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
