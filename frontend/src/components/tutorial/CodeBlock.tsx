'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: string;
  language?: string;
  caption?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeBlock({
  children,
  language = 'python',
  caption,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('my-6 group', className)}>
      {caption && (
        <div className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          {caption}
        </div>
      )}
      <div className="relative">
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {language && (
            <span className="text-xs font-medium text-secondary-400 dark:text-secondary-500 bg-neutral-800 dark:bg-neutral-900 px-2 py-1 rounded">
              {language}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="text-xs font-medium text-secondary-400 dark:text-secondary-500 bg-neutral-800 dark:bg-neutral-900 px-3 py-1 rounded hover:bg-neutral-700 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Copy code"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <pre
          className={cn(
            'bg-neutral-900 dark:bg-black rounded-lg p-4 overflow-x-auto',
            'border border-neutral-800 dark:border-neutral-900',
            showLineNumbers && 'pl-12'
          )}
        >
          <code className="text-sm font-mono text-neutral-100 dark:text-neutral-200">
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}
