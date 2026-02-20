'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import { FiCheckCircle } from 'react-icons/fi';

export default function CustomizedErpSection() {
  const t = useTranslations('products.erp.customized');

  const advantages = [
    {
      title: t('advantage1'),
      description: t('advantage1Desc'),
    },
    {
      title: t('advantage2'),
      description: t('advantage2Desc'),
    },
    {
      title: t('advantage3'),
      description: t('advantage3Desc'),
    },
    {
      title: t('advantage4'),
      description: t('advantage4Desc'),
    },
    {
      title: t('advantage5'),
      description: t('advantage5Desc'),
    },
    {
      title: t('advantage6'),
      description: t('advantage6Desc'),
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 py-20 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Problem & Approach */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
              {t('title')}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('subtitle')}
            </p>

            {/* Problem Box */}
            <div className="bg-white dark:bg-[#1E1E21] rounded-2xl p-6 mb-8 border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {t('problem')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('problemDesc')}
              </p>
            </div>

            {/* Approach Header */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {t('ourApproach')}
            </h3>
          </motion.div>

          {/* Right Side - Advantages */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4"
          >
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-4 bg-white dark:bg-[#1E1E21] p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <FiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                    {advantage.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {advantage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
