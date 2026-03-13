'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface LearningPathVisualizationProps {
  className?: string;
}

export default function LearningPathVisualization({
  className,
}: LearningPathVisualizationProps) {
  const t = useTranslations('pythonBasic.path');

  const paths = [
    {
      icon: '🌱',
      title: t('beginner'),
      description: 'Start from zero',
      color: 'green',
    },
    {
      icon: '⚡',
      title: t('backend'),
      description: 'Build APIs & systems',
      color: 'blue',
    },
    {
      icon: '🏆',
      title: t('erp'),
      description: 'Enterprise solutions',
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      green: {
        bg: 'bg-green-100 dark:bg-green-950/30',
        border: 'border-green-300 dark:border-green-700',
        text: 'text-green-700 dark:text-green-400',
      },
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-950/30',
        border: 'border-blue-300 dark:border-blue-700',
        text: 'text-blue-700 dark:text-blue-400',
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-950/30',
        border: 'border-purple-300 dark:border-purple-700',
        text: 'text-purple-700 dark:text-purple-400',
      },
    };
    return colors[color] || colors.green;
  };

  return (
    <div className={cn('py-12', className)}>
      <h2 className="text-3xl font-bold text-center text-secondary-900 dark:text-white mb-4">
        {t('title')}
      </h2>
      <p className="text-center text-secondary-600 dark:text-secondary-400 mb-12 max-w-2xl mx-auto">
        Master Python fundamentals and prepare yourself for professional backend development and ERP systems
      </p>

      {/* Desktop: Horizontal */}
      <div className="hidden md:flex items-center justify-center gap-6">
        {paths.map((path, index) => {
          const colors = getColorClasses(path.color);
          return (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  'flex flex-col items-center justify-center',
                  'w-48 h-32 rounded-2xl border-2',
                  'transition-all duration-300 hover:scale-105',
                  colors.bg,
                  colors.border
                )}
              >
                <div className="text-4xl mb-2">{path.icon}</div>
                <div className={cn('font-bold text-lg mb-1', colors.text)}>
                  {path.title}
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">
                  {path.description}
                </div>
              </div>
              {index < paths.length - 1 && (
                <div className="flex items-center mx-2">
                  <div className="text-3xl text-secondary-400 dark:text-secondary-600">
                    →
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: Vertical */}
      <div className="flex md:hidden flex-col items-center gap-4">
        {paths.map((path, index) => {
          const colors = getColorClasses(path.color);
          return (
            <div key={index} className="flex flex-col items-center w-full max-w-xs">
              <div
                className={cn(
                  'flex flex-col items-center justify-center',
                  'w-full h-32 rounded-2xl border-2',
                  colors.bg,
                  colors.border
                )}
              >
                <div className="text-4xl mb-2">{path.icon}</div>
                <div className={cn('font-bold text-lg mb-1', colors.text)}>
                  {path.title}
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">
                  {path.description}
                </div>
              </div>
              {index < paths.length - 1 && (
                <div className="text-3xl text-secondary-400 dark:text-secondary-600 my-2">
                  ↓
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
