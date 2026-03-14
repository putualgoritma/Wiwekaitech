'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useApiData } from '@/hooks/use-api-data';
import type { Tutorial } from '@/lib/api-schemas';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export default function TutorialPageClient() {
  const locale = useLocale();
  const t = useTranslations('tutorial');
  const tCommon = useTranslations('common');
  const { data, loading, error } = useApiData<Tutorial[]>('/tutorials', { page_size: 12 });

  const resolveTutorialHref = (tutorialUrl: string | null | undefined, slug: string) => {
    if (!tutorialUrl || tutorialUrl.trim() === '') {
      return `/${locale}/tutorial/${slug}`;
    }

    const url = tutorialUrl.trim();
    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    if (/^\/(en|id)\//i.test(url)) {
      return url;
    }

    if (url.startsWith('/')) {
      return `/${locale}${url}`;
    }

    return `/${locale}/${url}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'danger';
      default:
        return 'secondary';
    }
  };

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
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80"
              alt="Laptop workspace for coding tutorials"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((tutorial) => (
              <Link
                key={tutorial.id}
                href={resolveTutorialHref(tutorial.tutorial_url, tutorial.slug)}
                target={tutorial.tutorial_url && /^https?:\/\//i.test(tutorial.tutorial_url) ? '_blank' : undefined}
                rel={tutorial.tutorial_url && /^https?:\/\//i.test(tutorial.tutorial_url) ? 'noopener noreferrer' : undefined}
                className="block"
              >
                <Card hover>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      {tutorial.category && (
                        <Badge variant="secondary">{tutorial.category.name}</Badge>
                      )}
                      <Badge variant={getDifficultyColor(tutorial.difficulty_level) as any}>
                        {t(`difficulty.${tutorial.difficulty_level}`)}
                      </Badge>
                    </div>
                    <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                      {tutorial.title}
                    </h2>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4 text-sm">
                      {tutorial.excerpt}
                    </p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      {t('readingTime', { minutes: tutorial.reading_time })}
                    </p>
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
