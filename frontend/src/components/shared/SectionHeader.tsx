'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left' | 'right';
}

/**
 * Reusable section header component
 * Eliminates duplication of title/subtitle/description pattern across sections
 * Provides consistent styling and animation
 */
export default function SectionHeader({
  subtitle,
  title,
  description,
  align = 'center'
}: SectionHeaderProps) {
  const alignClass = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right'
  }[align];

  return (
    <div className={`mb-12 ${alignClass}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-brand-accent font-semibold text-sm tracking-wider uppercase"
        >
          {subtitle}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold mt-2 text-secondary-900 dark:text-secondary-50"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-secondary-600 dark:text-secondary-400 mt-4 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
