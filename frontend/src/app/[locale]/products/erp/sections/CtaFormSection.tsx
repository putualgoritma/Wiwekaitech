'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import ContactForm from '@/components/forms/ContactForm';

export default function CtaFormSection() {
  const t = useTranslations('products.erp.cta');

  return (
    <Section className="bg-gray-50 dark:bg-slate-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('subtitle')}
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E1E21] rounded-2xl p-8 md:p-12 shadow-lg">
            <ContactForm />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
