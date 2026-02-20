'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function HeroSection() {
  const t = useTranslations('products.csp.hero');
  const locale = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-32 pb-20">
      <Container>
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badges */}
          <motion.div className="flex flex-wrap gap-3 justify-center mb-8" variants={itemVariants}>
            <Badge variant="primary">{t('badge1')}</Badge>
            <Badge variant="secondary">{t('badge2')}</Badge>
            <Badge variant="success">{t('badge3')}</Badge>
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            {t('title')}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link href={`/${locale}/contact`}>
              <Button size="lg" variant="primary">
                {t('cta_request_demo')}
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button size="lg" variant="ghost">
                {t('cta_talk_expert')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
