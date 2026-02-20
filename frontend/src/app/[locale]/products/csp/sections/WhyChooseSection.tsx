'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/shared/Card';
import {
  FiSmartphone,
  FiLock,
  FiZap,
  FiTrendingUp,
  FiCode,
  FiHeadphones,
} from 'react-icons/fi';

export default function WhyChooseSection() {
  const t = useTranslations('products.csp.whyChoose');

  const features = [
    { key: 'webMobile', icon: FiSmartphone },
    { key: 'security', icon: FiLock },
    { key: 'development', icon: FiZap },
    { key: 'scalable', icon: FiTrendingUp },
    { key: 'codeQuality', icon: FiCode },
    { key: 'support', icon: FiHeadphones },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.key} variants={itemVariants}>
                <Card className="h-full hover:border-green-300 dark:hover:border-green-500 transition-colors group">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/20 dark:to-green-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-100 dark:group-hover:from-green-500/30 dark:group-hover:to-green-600/30 transition-all">
                    <Icon className="text-green-600 dark:text-green-400 w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {t(`${feature.key}_title`)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t(`${feature.key}_description`)}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
