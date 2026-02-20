'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import {
  FiSettings,
  FiLayers,
  FiGitBranch,
  FiZap,
  FiLock,
  FiArrowUpRight,
} from 'react-icons/fi';

export default function CustomizeSection() {
  const t = useTranslations('products.csp.customize');

  const customizations = [
    { key: 'savings', icon: FiSettings },
    { key: 'loans', icon: FiGitBranch },
    { key: 'interest', icon: FiZap },
    { key: 'penalties', icon: FiArrowUpRight },
    { key: 'sharing', icon: FiLayers },
    { key: 'workflows', icon: FiLock },
  ];

  const characteristics = ['modular', 'scalable', 'secure', 'integration', 'expandable'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
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

        {/* Customization Options */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {customizations.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-green-500/10 transition-all group"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-green-500/20 group-hover:to-green-600/20 transition-colors">
                  <Icon className="text-green-600 dark:text-green-400 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {t(`${item.key}_title`)}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{t(`${item.key}_desc`)}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* System Characteristics */}
        <motion.div
          className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 border border-slate-700 dark:border-slate-600"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            {t('characteristics_title')}
          </h3>
          <motion.div
            className="grid md:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {characteristics.map((char) => (
              <motion.div
                key={char}
                className="text-center py-6 px-4 bg-white/5 dark:bg-white/5 rounded-xl border border-white/10 hover:border-green-500/30 transition-colors"
                variants={itemVariants}
              >
                <p className="text-white font-semibold">{t(`characteristic_${char}`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
