'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '../shared/Container';
import Section from '../shared/Section';
import { SOCIAL_LINKS } from '@/lib/constants';

export default function ContactForm() {
  const t = useTranslations();

  return (
    <Section className="bg-white dark:bg-[#1E1E21]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 bg-neutral-100 dark:bg-neutral-800 p-8 md:p-12 rounded-3xl shadow-xl transition-colors"
        >
          {/* Left Column - Contact Info */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-green-500 dark:text-green-400">
              {t('contactCta.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {t('contactCta.subtitle')}
            </p>
            <div className="space-y-4 pt-4">
              {/* Address */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-800 dark:text-gray-200">Jakarta, Indonesia</span>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-3.28a19.093 19.093 0 01-10.23-10.23A19.093 19.093 0 013 5z" />
                  </svg>
                </div>
                <span className="text-gray-800 dark:text-gray-200">{SOCIAL_LINKS.phone}</span>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-800 dark:text-gray-200">{SOCIAL_LINKS.email}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex-1">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t('contact.form.namePlaceholder')}
                  className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t('contact.form.submit')}
              </button>
            </form>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
