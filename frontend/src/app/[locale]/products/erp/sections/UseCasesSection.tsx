'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';
import {
  FiCpu,
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiTool,
} from 'react-icons/fi';

export default function UseCasesSection() {
  const t = useTranslations('products.erp.useCases');

  const useCases = [
    {
      icon: FiCpu,
      title: t('case1'),
      description: t('case1Desc'),
    },
    {
      icon: FiPackage,
      title: t('case2'),
      description: t('case2Desc'),
    },
    {
      icon: FiShoppingCart,
      title: t('case3'),
      description: t('case3Desc'),
    },
    {
      icon: FiDollarSign,
      title: t('case4'),
      description: t('case4Desc'),
    },
    {
      icon: FiTool,
      title: t('case5'),
      description: t('case5Desc'),
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
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full p-6 bg-white dark:bg-[#1E1E21] border-t-4 border-green-500 hover:shadow-lg transition-shadow">
                  <Icon className="w-10 h-10 text-green-500 mb-4" />
                  <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {useCase.description}
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
