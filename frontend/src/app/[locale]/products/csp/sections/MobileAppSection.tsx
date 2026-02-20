'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import { FiSmartphone, FiCheck } from 'react-icons/fi';

export default function MobileAppSection() {
  const t = useTranslations('products.csp.mobileApp');

  const features = ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'];
  const benefits = ['benefit1', 'benefit2', 'benefit3', 'benefit4'];

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
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left - Visual with Phone Mockup */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 dark:from-green-500/10 dark:to-blue-500/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-3xl p-8 md:p-12 border border-green-200 dark:border-slate-500 flex items-center justify-center min-h-96">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <FiSmartphone className="w-32 h-32 md:w-48 md:h-48 text-green-600 dark:text-green-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Features & Benefits */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t('uniqueValue')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {t('explanation')}
              </p>
            </div>

            {/* Member Capabilities */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-8 border border-slate-200 dark:border-slate-600">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">
                {t('memberCapabilities_title')}
              </h4>
              <motion.ul className="space-y-3" variants={containerVariants}>
                {features.map((feature) => (
                  <motion.li
                    key={feature}
                    className="flex gap-3 items-start text-slate-700 dark:text-slate-300"
                    variants={itemVariants}
                  >
                    <span className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1">
                      <FiCheck className="w-5 h-5" />
                    </span>
                    <span>{t(feature)}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8 border border-green-200 dark:border-slate-500">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">
                {t('benefits_title')}
              </h4>
              <motion.ul className="space-y-3" variants={containerVariants}>
                {benefits.map((benefit) => (
                  <motion.li
                    key={benefit}
                    className="flex gap-3 items-start text-slate-700 dark:text-slate-300"
                    variants={itemVariants}
                  >
                    <span className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1">✨</span>
                    <span>{t(benefit)}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
