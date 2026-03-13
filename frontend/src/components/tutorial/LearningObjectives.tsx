'use client';

import { cn } from '@/lib/utils';

interface LearningObjectivesProps {
  objectives?: string[];
  className?: string;
}

export default function LearningObjectives({
  objectives = [],
  className,
}: LearningObjectivesProps) {
  // Don't render if no objectives provided
  if (!objectives || objectives.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'my-8 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r-lg p-6',
        className
      )}
    >
      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        Learning Objectives
      </h3>
      <ul className="space-y-2">
        {objectives.map((objective, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-blue-800 dark:text-blue-200"
          >
            <span className="inline-block mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
            <span className="flex-1">{objective}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
