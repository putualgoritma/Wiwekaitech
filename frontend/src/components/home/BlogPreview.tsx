'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApiData } from '@/hooks/use-api-data';
import type { BlogPost } from '@/lib/api-schemas';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Button from '../shared/Button';
import { API_BASE_URL } from '@/lib/api';

export default function BlogPreview() {
  const t = useTranslations();
  const locale = useLocale();
  const buildHref = (href: string) => `/${locale}${href}`;
  
  // Fetch recent blog posts (limit to 2)
  const { data: posts, loading } = useApiData<BlogPost[]>('/blog', { page_size: 2 });

  // Get full image URL
  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith('http')
      ? imageUrl
      : `${API_BASE_URL.replace('/api/v1', '')}${imageUrl}`;
  };

  // Fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80';

  return (
    <Section className="bg-neutral-50 dark:bg-neutral-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-green-500 mb-2 text-sm font-semibold">— {t('blog.subtitle')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('blog.title')}
          </h2>
        </motion.div>

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
            {t('common.loading')}
          </p>
        )}

        {!loading && posts && posts.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
            {posts.map((post, index) => (
              <Link key={post.id} href={buildHref(`/blog/${post.slug}`)}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full bg-neutral-200 dark:bg-neutral-700">
                    <Image
                      src={getImageUrl(post.image_url) || fallbackImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {post.category && (
                      <p className="text-green-600 dark:text-green-500 text-xs font-semibold mb-2">
                        {post.category.name}
                      </p>
                    )}
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.author_name}</span>
                      {post.reading_time > 0 && (
                        <span>{t('blog.readingTime', { minutes: post.reading_time })}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {!loading && (!posts || posts.length === 0) && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
            {t('common.notFound')}
          </p>
        )}

        <div className="text-center">
          <Link href={buildHref('/blog')}>
            <Button variant="primary">{t('blog.showAll')}</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
