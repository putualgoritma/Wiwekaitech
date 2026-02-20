'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Button from '../shared/Button';
import Link from 'next/link';

export default function WhyDifferentSection() {
  const t = useTranslations('whyDifferent');

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t('benefit1'),
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-500/20',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('benefit2'),
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-500/20',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: t('benefit3'),
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-500/20',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: t('benefit4'),
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-500/20',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('benefit5'),
      color: 'from-teal-400 to-teal-600',
      bgColor: 'bg-teal-500/20',
    },
  ];

  return (
    <Section className="bg-neutral-50 dark:bg-neutral-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-green-500 mb-2 text-sm font-semibold">— {t('subtitle')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Icon Card */}
              <div className="relative bg-white dark:bg-neutral-800 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-neutral-200 dark:border-neutral-700">
                {/* Icon Circle */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white shadow-lg`}>
                  {benefit.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                  {benefit.title}
                </h3>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 ${benefit.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/about">
            <Button variant="primary">Learn More About Our Process</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
