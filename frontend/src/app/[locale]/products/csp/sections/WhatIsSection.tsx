'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import { FiCheck } from 'react-icons/fi';

export default function WhatIsSection() {
  const t = useTranslations('products.csp.whatIs');

  const features = [
    { key: 'feature1', icon: '👥' },
    { key: 'feature2', icon: '💰' },
    { key: 'feature3', icon: '📊' },
    { key: 'feature4', icon: '⚡' },
    { key: 'feature5', icon: '🔍' },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <Section className="bg-white dark:bg-slate-800">
      <Container>
        <SectionHeader
          title={t('title')}
          description={t('description')}
        />

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Column - Text */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('content1')}
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={feature.key}
                  className="flex gap-3 items-start"
                  variants={itemVariants}
                >
                  <span className="text-2xl flex-shrink-0 mt-1">{feature.icon}</span>
                  <span className="text-slate-700 dark:text-slate-300">{t(feature.key)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Benefits */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('content2')}
            </p>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8 border border-slate-200 dark:border-slate-600">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {t('benefits_title')}
              </h3>
              <ul className="space-y-3">
                {['benefit1', 'benefit2', 'benefit3', 'benefit4'].map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 items-start text-slate-700 dark:text-slate-300"
                  >
                    <FiCheck className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1 w-5 h-5" />
                    <span>{t(benefit)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
