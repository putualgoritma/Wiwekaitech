'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { TableOfContentsData } from '@/lib/tutorials/types';

interface TableOfContentsProps {
  toc: TableOfContentsData;
  currentSlug?: string;
  className?: string;
}

export default function TableOfContents({
  toc,
  currentSlug,
  className,
}: TableOfContentsProps) {
  const t = useTranslations('pythonBasic.toc');

  const getPartIcon = (partNumber: number) => {
    const icons: Record<number, string> = {
      0: '🔹',
      1: '🧱',
      2: '🗂',
      3: '🧩',
      4: '🚀',
      5: '🎓',
      6: '📚',
    };
    return icons[partNumber] || '📖';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400',
      intermediate: 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400',
      advanced: 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:red-400',
    };
    return colors[difficulty] || colors.beginner;
  };

  return (
    <div className={cn('space-y-8', className)}>
      <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">
        {t('title')}
      </h2>

      {toc.parts.map((part) => (
        <div
          key={part.number}
          className="bg-white dark:bg-[#1E1E21] rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        >
          {/* Part Header */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white flex items-center gap-3">
              <span className="text-2xl">{getPartIcon(part.number)}</span>
              {part.number > 0 && part.number < 5 && (
                <span className="text-green-600 dark:text-green-400">
                  {t('part', { number: part.number })} —
                </span>
              )}
              <span>{part.title}</span>
            </h3>
          </div>

          {/* Chapters */}
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {part.chapters.map((chapter) => {
              const isActive = currentSlug === chapter.slug;
              
              return (
                <Link
                  key={chapter.slug}
                  href={`/tutorial/python-basic/${chapter.slug}`}
                  className={cn(
                    'block px-6 py-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900',
                    isActive && 'bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        {chapter.chapterNumber > 0 && (
                          <span className="text-sm font-medium text-secondary-500 dark:text-secondary-400">
                            {t('chapter', { number: chapter.chapterNumber })}
                          </span>
                        )}
                        <span
                          className={cn(
                            'text-xs px-2 py-0.5 rounded-full font-medium',
                            getDifficultyColor(chapter.difficulty)
                          )}
                        >
                          {chapter.difficulty}
                        </span>
                      </div>
                      <h4
                        className={cn(
                          'font-semibold text-secondary-900 dark:text-white',
                          isActive && 'text-green-700 dark:text-green-400'
                        )}
                      >
                        {chapter.title}
                      </h4>
                    </div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400 whitespace-nowrap">
                      {t('readingTime', { minutes: chapter.readingTime })}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
