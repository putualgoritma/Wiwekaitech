'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { NavigationData } from '@/lib/tutorials/types';

interface ChapterNavigationProps {
  navigation: NavigationData;
  className?: string;
}

export default function ChapterNavigation({
  navigation,
  className,
}: ChapterNavigationProps) {
  const t = useTranslations('pythonBasic.chapter');

  return (
    <nav
      className={cn(
        'mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800',
        'grid grid-cols-1 md:grid-cols-3 gap-4',
        className
      )}
    >
      {/* Previous Chapter */}
      <div className="flex justify-start">
        {navigation.previous ? (
          <Link
            href={`/tutorial/python-basic/${navigation.previous.slug}`}
            className="group flex items-center gap-2 px-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
          >
            <span className="text-lg group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <div className="text-left">
              <div className="text-xs text-secondary-500 dark:text-secondary-400">
                {t('previous')}
              </div>
              <div className="text-sm font-medium text-secondary-900 dark:text-white line-clamp-1">
                {navigation.previous.title}
              </div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      {/* Back to TOC */}
      <div className="flex justify-center">
        <Link
          href={navigation.toc.slug}
          className="group flex items-center gap-2 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all"
        >
          <span className="text-lg group-hover:-translate-y-1 transition-transform">
            ↑
          </span>
          <div className="text-sm font-medium text-green-700 dark:text-green-300">
            {t('backToTOC')}
          </div>
        </Link>
      </div>

      {/* Next Chapter */}
      <div className="flex justify-end">
        {navigation.next ? (
          <Link
            href={`/tutorial/python-basic/${navigation.next.slug}`}
            className="group flex items-center gap-2 px-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
          >
            <div className="text-right">
              <div className="text-xs text-secondary-500 dark:text-secondary-400">
                {t('next')}
              </div>
              <div className="text-sm font-medium text-secondary-900 dark:text-white line-clamp-1">
                {navigation.next.title}
              </div>
            </div>
            <span className="text-lg group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}
