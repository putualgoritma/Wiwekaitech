'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Button from '../shared/Button';
import Badge from '../shared/Badge';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <Section className="relative bg-white dark:bg-[#1E1E21] min-h-screen flex items-center overflow-hidden pt-24">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2 z-10"
          >
            <p className="text-green-600 dark:text-green-500 text-sm font-semibold mb-4">
              {t('badge1')}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              {t('subtitle')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
              <Link href="/projects">
                <Button size="lg">{t('cta1')}</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary">{t('cta2')}</Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary">{t('badge1')}</Badge>
              <Badge variant="success">{t('badge2')}</Badge>
              <Badge variant="secondary">{t('badge3')}</Badge>
            </div>
          </motion.div>

          {/* Right Content: Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0"
          >
            {/* Green Circle Background */}
            <div className="absolute w-[400px] h-[400px] bg-green-500/20 dark:bg-green-500/10 rounded-full blur-3xl"></div>
            
            {/* Hero Image Container */}
            <div className="relative w-full max-w-lg z-10">
              {/* Placeholder for hero image - replace with actual dashboard screenshot */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-400 to-green-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold">ERP Dashboard Preview</p>
                    <p className="text-xs opacity-80 mt-2">Add your screenshot to /public/images/hero-dashboard.png</p>
                  </div>
                </div>
                {/* Uncomment when you add the image */}
                {/* <Image
                  src="/images/hero-dashboard.png"
                  alt="ERP Dashboard"
                  fill
                  className="object-cover"
                  priority
                /> */}
              </div>
              
              {/* Floating Stats */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-xl"
              >
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Faster Delivery</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-500">40%</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -top-6 -right-6 bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-xl"
              >
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Uptime</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-500">99.9%</p>
              </motion.div>
            </div>

            {/* Floating Icons */}
            <div className="absolute w-[500px] h-[500px] flex items-center justify-center pointer-events-none">
              {[
                { label: 'API', rotate: -45 },
                { label: 'SQL', rotate: 45 },
                { label: 'AI', rotate: 135 },
                { label: 'ERP', rotate: -135 },
              ].map(({ label, rotate }, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  style={{
                    transform: `rotate(${rotate}deg) translate(220px) rotate(${-rotate}deg)`,
                  }}
                >
                  <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-green-600 dark:text-green-400 font-bold text-xs">{label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
