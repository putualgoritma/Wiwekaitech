'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Button from '@/components/shared/Button';

export default function CtaFormSection() {
  const t = useTranslations('products.csp.ctaForm');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', organization: '', phone: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-24">
      <Container>
        <motion.div
          className="max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-lg dark:shadow-2xl"
            variants={itemVariants}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
                >
                  {t('field_name')}
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder={t('placeholder_name')}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
                >
                  {t('field_email')}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder={t('placeholder_email')}
                />
              </div>

              {/* Organization */}
              <div>
                <label
                  htmlFor="organization"
                  className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
                >
                  {t('field_organization')}
                </label>
                <input
                  id="organization"
                  type="text"
                  name="organization"
                  value={formState.organization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder={t('placeholder_organization')}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
                >
                  {t('field_phone')}
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder={t('placeholder_phone')}
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
              >
                {t('field_message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
                placeholder={t('placeholder_message')}
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.div
              className="relative"
              variants={itemVariants}
            >
              <Button
                type="submit"
                size="lg"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('button_submitting') : t('button_submit')}
              </Button>
              
              {submitSuccess && (
                <motion.div
                  className="absolute inset-0 bg-green-500 rounded-lg flex items-center justify-center text-white font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {t('success_message')}
                </motion.div>
              )}
            </motion.div>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
              {t('privacy_notice')}
            </p>
          </motion.form>
        </motion.div>
      </Container>
    </Section>
  );
}
