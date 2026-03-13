'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Button from '@/components/shared/Button';

interface TutorialHeroProps {
  title: string;
  subtitle: string;
  author: string;
  lastUpdated: string;
  className?: string;
  onStartLearning?: () => void;
}

export default function TutorialHero({
  title,
  subtitle,
  author,
  lastUpdated,
  className,
  onStartLearning,
}: TutorialHeroProps) {
  const t = useTranslations('pythonBasic.hero');

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20 rounded-3xl shadow-2xl',
        className
      )}
    >
      <div className="relative z-10 px-8 py-16 md:px-12 md:py-20 text-center">
        {/* Icon */}
        <div className="text-7xl md:text-8xl mb-6 animate-pulse">📘</div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white mb-6">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-secondary-700 dark:text-secondary-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-secondary-600 dark:text-secondary-400 mb-8">
          <div className="flex items-center gap-2">
            <span>👤</span>
            <span>{t('author', { author })}</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{t('lastUpdated', { date: lastUpdated })}</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            onClick={onStartLearning}
            variant="primary"
            size="lg"
            className="group"
          >
            <span>{t('cta')}</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">
              →
            </span>
          </Button>
        </div>
      </div>

      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}
