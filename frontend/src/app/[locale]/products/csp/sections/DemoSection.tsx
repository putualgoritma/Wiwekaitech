'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Button from '@/components/shared/Button';
import { FiMonitor, FiSmartphone, FiPlay } from 'react-icons/fi';

export default function DemoSection() {
  const t = useTranslations('products.csp.demo');
  const locale = useLocale();

  const demoCards = [
    { key: 'website', icon: FiMonitor },
    { key: 'mobile', icon: FiSmartphone },
    { key: 'personalized', icon: FiPlay },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Section className="bg-white dark:bg-slate-800">
      <Container>
        <SectionHeader
          title={t('title')}
          description={t('description')}
          align="center"
        />

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {demoCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.key} variants={itemVariants}>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8 border border-slate-200 dark:border-slate-600 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-green-600 dark:text-green-400 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {t(`${card.key}_title`)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {t(`${card.key}_description`)}
                  </p>
                  <Link href={`/${locale}/contact`}>
                    <Button size="md" variant="secondary">
                      {t(`${card.key}_cta`)}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
