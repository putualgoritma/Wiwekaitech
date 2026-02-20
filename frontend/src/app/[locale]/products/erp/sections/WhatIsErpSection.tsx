'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';
import { FiDatabase, FiGrid, FiTrendingUp, FiZap } from 'react-icons/fi';

export default function WhatIsErpSection() {
  const t = useTranslations('products.erp.whatIs');

  const features = [
    {
      icon: FiDatabase,
      title: t('feature1'),
      description: t('feature1Desc'),
    },
    {
      icon: FiGrid,
      title: t('feature2'),
      description: t('feature2Desc'),
    },
    {
      icon: FiTrendingUp,
      title: t('feature3'),
      description: t('feature3Desc'),
    },
    {
      icon: FiZap,
      title: t('feature4'),
      description: t('feature4Desc'),
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
    <Section className="bg-white dark:bg-[#1E1E21]">
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full p-8">
                  <Icon className="w-10 h-10 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
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
