'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/shared/Card';
import { FiTarget } from 'react-icons/fi';

export default function UseCasesSection() {
  const t = useTranslations('products.csp.useCases');

  const useCases = ['ksp', 'creditUnions', 'employees', 'community', 'microfinance', 'islamic'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
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
          {useCases.map((useCase) => (
            <motion.div key={useCase} variants={itemVariants}>
              <Card className="h-full hover:shadow-xl dark:hover:shadow-green-500/20 transition-all border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-500 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-500/20 dark:to-green-600/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiTarget className="text-green-600 dark:text-green-400 w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {t(`${useCase}_title`)}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
                  {t(`${useCase}_description`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
