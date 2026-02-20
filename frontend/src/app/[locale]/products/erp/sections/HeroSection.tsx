'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';

export default function HeroSection() {
  const t = useTranslations('products.erp.hero');
  const locale = useLocale();

  const buildHref = (href: string) => `/${locale}${href}`;

  return (
    <Section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center min-h-[600px] text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl">
            {t('title')}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={buildHref('/contact')}>
              <Button size="lg" className="md:w-auto">
                {t('demo')}
              </Button>
            </Link>

            <Link href={buildHref('/contact')}>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-slate-900 md:w-auto">
                {t('sales')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
