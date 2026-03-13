/**
 * MDX Components Provider
 * Maps custom React components for use in MDX content
 */

import CodeBlock from './CodeBlock';
import ImageBlock from './ImageBlock';
import LearningObjectives from './LearningObjectives';
import { cn } from '@/lib/utils';

export const mdxComponents = {
  // Custom tutorial components
  CodeBlock,
  ImageBlock,
  LearningObjectives,

  // Enhanced HTML elements with styling
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'text-3xl font-bold mt-12 mb-4 text-secondary-900 dark:text-white scroll-mt-20',
        className
      )}
      {...props}
    />
  ),

  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'text-2xl font-semibold mt-8 mb-3 text-secondary-900 dark:text-white scroll-mt-20',
        className
      )}
      {...props}
    />
  ),

  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'text-xl font-semibold mt-6 mb-2 text-secondary-900 dark:text-white scroll-mt-20',
        className
      )}
      {...props}
    />
  ),

  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        'mb-4 leading-relaxed text-secondary-700 dark:text-secondary-300',
        className
      )}
      {...props}
    />
  ),

  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        'list-disc pl-6 mb-4 space-y-2 text-secondary-700 dark:text-secondary-300',
        className
      )}
      {...props}
    />
  ),

  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        'list-decimal pl-6 mb-4 space-y-2 text-secondary-700 dark:text-secondary-300',
        className
      )}
      {...props}
    />
  ),

  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('leading-relaxed', className)} {...props} />
  ),

  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        'border-l-4 border-green-500 pl-4 py-2 my-4 italic bg-green-50 dark:bg-green-950/20 rounded-r-lg',
        className
      )}
      {...props}
    />
  ),

  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono text-secondary-900 dark:text-secondary-100',
        className
      )}
      {...props}
    />
  ),

  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'bg-neutral-900 dark:bg-black rounded-lg p-4 overflow-x-auto my-6 border border-neutral-800 dark:border-neutral-900',
        className
      )}
      {...props}
    />
  ),

  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline transition-colors',
        className
      )}
      {...props}
    />
  ),

  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table
        className={cn(
          'min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg',
          className
        )}
        {...props}
      />
    </div>
  ),

  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'px-4 py-3 bg-neutral-100 dark:bg-neutral-900 text-left text-sm font-semibold text-secondary-900 dark:text-white',
        className
      )}
      {...props}
    />
  ),

  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'px-4 py-3 text-sm text-secondary-700 dark:text-secondary-300 border-t border-neutral-200 dark:border-neutral-800',
        className
      )}
      {...props}
    />
  ),

  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className={cn(
        'my-8 border-neutral-200 dark:border-neutral-800',
        className
      )}
      {...props}
    />
  ),

  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn('font-bold text-secondary-900 dark:text-white', className)}
      {...props}
    />
  ),

  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className={cn('italic', className)} {...props} />
  ),
};

export type MDXComponents = typeof mdxComponents;
