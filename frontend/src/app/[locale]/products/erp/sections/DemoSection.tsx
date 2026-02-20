'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import { FiExternalLink } from 'react-icons/fi';

export default function DemoSection() {
  const t = useTranslations('products.erp.demo');
  const locale = useLocale();

  const buildHref = (href: string) => `/${locale}${href}`;

  return (
    <Section className="bg-white dark:bg-[#1E1E21]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            {t('title')}
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://jaan-erp.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="flex items-center gap-2 md:w-auto">
                <FiExternalLink className="w-4 h-4" />
                {t('visitDemo')}
              </Button>
            </a>

            <Link href={buildHref('/contact')}>
              <Button size="lg" className="md:w-auto">
                {t('requestDemo')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
