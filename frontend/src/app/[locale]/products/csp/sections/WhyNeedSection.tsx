'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import { FiZap, FiUsers, FiTrendingUp, FiShield, FiDatabase, FiBarChart } from 'react-icons/fi';

export default function WhyNeedSection() {
  const t = useTranslations('products.csp.whyNeed');

  const reasons = [
    { key: 'reason1', icon: FiUsers },
    { key: 'reason2', icon: FiZap },
    { key: 'reason3', icon: FiTrendingUp },
    { key: 'reason4', icon: FiBarChart },
    { key: 'reason5', icon: FiShield },
    { key: 'reason6', icon: FiDatabase },
  ];

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
    <Section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
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
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.key}
                className="bg-white/10 backdrop-blur-sm dark:bg-white/5 rounded-2xl p-8 border border-white/20 dark:border-white/10 hover:border-green-500/30 dark:hover:border-green-500/30 transition-colors group"
                variants={itemVariants}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="text-white w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{t(reason.key + '_title')}</h3>
                <p className="text-slate-300">{t(reason.key + '_description')}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
