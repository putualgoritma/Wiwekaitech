'use client';

import { cn } from '@/lib/utils';
import type { ChapterFrontmatter, NavigationData } from '@/lib/tutorials/types';
import ChapterNavigation from './ChapterNavigation';

interface ChapterLayoutProps {
  frontmatter: ChapterFrontmatter;
  navigation: NavigationData;
  children: React.ReactNode;
  className?: string;
}

export default function ChapterLayout({
  frontmatter,
  navigation,
  children,
  className,
}: ChapterLayoutProps) {
  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700',
      intermediate: 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700',
      advanced: 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700',
    };
    return colors[difficulty] || colors.beginner;
  };

  return (
    <article className={cn('max-w-3xl mx-auto', className)}>
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-secondary-500 dark:text-secondary-400">
        <span>Python Basic</span>
        <span className="mx-2">/</span>
        {frontmatter.partTitle && (
          <>
            <span>{frontmatter.partTitle}</span>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-secondary-900 dark:text-white">
          {frontmatter.title}
        </span>
      </nav>

      {/* Chapter Header */}
      <header className="mb-8 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        {/* Chapter Number & Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {frontmatter.chapterNumber > 0 && (
            <span className="text-sm font-medium text-secondary-500 dark:text-secondary-400">
              Chapter {frontmatter.chapterNumber}
            </span>
          )}
          <span
            className={cn(
              'text-xs px-3 py-1 rounded-full font-medium border',
              getDifficultyColor(frontmatter.difficulty)
            )}
          >
            {frontmatter.difficulty}
          </span>
          {frontmatter.readingTime && (
            <span className="text-sm text-secondary-500 dark:text-secondary-400">
              📖 {frontmatter.readingTime} min read
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
          {frontmatter.title}
        </h1>

        {/* Summary */}
        {frontmatter.summary && (
          <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
            {frontmatter.summary}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </div>

      {/* Navigation */}
      <ChapterNavigation navigation={navigation} />
    </article>
  );
}
