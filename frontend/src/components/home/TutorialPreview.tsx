'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApiData } from '@/hooks/use-api-data';
import type { Tutorial } from '@/lib/api-schemas';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Badge from '../shared/Badge';
import Button from '../shared/Button';

export default function TutorialPreview() {
  const t = useTranslations();
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const buildHref = (href: string) => `/${locale}${href}`;
  const { data: tutorials, loading, error } = useApiData<Tutorial[]>('/tutorials', { page_size: 3 });

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
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'secondary';
    }
  };

  const getDifficultyLabelClass = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30';
      case 'intermediate':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'advanced':
        return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30';
    }
  };

  return (
    <Section className="bg-white dark:bg-[#1E1E21]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-green-500 mb-2 text-sm font-semibold">— {t('tutorial.subtitle')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('tutorial.title')}
          </h2>
        </motion.div>

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
            {tCommon('loading')}
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 mb-10">
            {tCommon('error')}: {error}
          </p>
        )}

        {!loading && !error && tutorials && tutorials.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {tutorials.map((tutorial, index) => {
            const difficulty = tutorial.difficulty_level || tutorial.difficulty || 'beginner';
            const href = resolveTutorialHref(tutorial.tutorial_url, tutorial.slug);
            const external = /^https?:\/\//i.test(href);

            return (
            <Link
              key={tutorial.id}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-br from-emerald-400/50 via-cyan-400/30 to-sky-500/40 hover:from-emerald-400 hover:to-sky-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-slate-900/10"
            >
              <div className="relative h-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur rounded-3xl p-6 border border-white/50 dark:border-white/10">
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 blur-2xl" />

                <div className="relative flex items-start justify-between gap-3 mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    <span className="text-lg leading-none">{tutorial.icon || '📘'}</span>
                    <span>{tutorial.category?.name || 'Tutorial'}</span>
                  </div>

                  <Badge
                    variant={getDifficultyColor(difficulty)}
                    className={`border ${getDifficultyLabelClass(difficulty)}`}
                  >
                    {t(`tutorial.difficulty.${difficulty}`)}
                  </Badge>
                </div>

                <h3 className="relative text-xl font-bold mb-2 text-slate-900 dark:text-slate-100 line-clamp-2">
                  {tutorial.title}
                </h3>

                <p className="relative text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-5 min-h-[2.75rem]">
                  {tutorial.excerpt}
                </p>

                <div className="relative flex items-center justify-between pt-4 border-t border-slate-200/70 dark:border-slate-700/70">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {t('tutorial.readingTime', { minutes: tutorial.reading_time || 0 })}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    <span>Read</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </motion.div>
            </Link>
          );})}
        </div>
        )}

        {!loading && !error && (!tutorials || tutorials.length === 0) && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
            {tCommon('notFound')}
          </p>
        )}

        <div className="text-center">
          <Link href={buildHref('/tutorial')}>
            <Button variant="primary">{t('tutorial.showAll')}</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
