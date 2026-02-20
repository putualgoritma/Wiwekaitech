import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'lg', children, ...props }, ref) => {
    const spacings = {
      sm: 'py-12',
      md: 'py-16',
      lg: 'py-20',
    };

    return (
      <section
        ref={ref}
        className={cn(spacings[spacing], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
