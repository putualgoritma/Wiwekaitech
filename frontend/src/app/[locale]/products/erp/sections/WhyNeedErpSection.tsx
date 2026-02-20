'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';
import {
  FiLink2,
  FiTrendingUp,
  FiZap,
  FiTarget,
  FiCheckCircle,
} from 'react-icons/fi';

export default function WhyNeedErpSection() {
  const t = useTranslations('products.erp.whyNeed');

  const reasons = [
    {
      icon: FiLink2,
      title: t('reason1'),
      description: t('reason1Desc'),
    },
    {
      icon: FiTrendingUp,
      title: t('reason2'),
      description: t('reason2Desc'),
    },
    {
      icon: FiZap,
      title: t('reason3'),
      description: t('reason3Desc'),
    },
    {
      icon: FiTarget,
      title: t('reason4'),
      description: t('reason4Desc'),
    },
    {
      icon: FiCheckCircle,
      title: t('reason5'),
      description: t('reason5Desc'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section className="bg-gray-50 dark:bg-slate-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full p-6 bg-white dark:bg-[#1E1E21] hover:shadow-lg transition-shadow">
                  <Icon className="w-10 h-10 text-green-500 mb-4" />
                  <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {reason.description}
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
