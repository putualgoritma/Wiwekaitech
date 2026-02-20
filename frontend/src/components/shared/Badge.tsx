import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-green-500/20 text-green-600 dark:text-green-400',
      secondary: 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300',
      success: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      warning: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
      danger: 'bg-rose-500/20 text-rose-600 dark:text-rose-400',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
