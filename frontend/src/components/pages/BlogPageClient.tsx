'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useApiData } from '@/hooks/use-api-data';
import type { BlogPost } from '@/lib/api-schemas';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';

export default function BlogPageClient() {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const { data, loading, error } = useApiData<BlogPost[]>('/blog', { page_size: 10 });

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
          <div className="max-w-4xl mx-auto space-y-6">
            {data.map((post) => (
              <Card key={post.id} hover>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-2">
                    {post.title}
                  </h2>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400">
                    <span>
                      {t('by')} {post.author_name} {t('on')} {post.published_at}
                    </span>
                    <span>{t('readingTime', { minutes: post.reading_time })}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
