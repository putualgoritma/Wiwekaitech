'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Button from '../shared/Button';

export default function ContactCTA() {
  const t = useTranslations('contactCta');
  const locale = useLocale();
  const buildHref = (href: string) => `/${locale}${href}`;

  return (
    <Section className="bg-gradient-to-br from-green-400 to-green-600 text-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-white/90 mb-8">
            {t('subtitle')}
          </p>
          <Link href={buildHref('/contact')}>
            <Button size="lg" variant="primary" className="bg-white text-black hover:bg-gray-100">
              {t('cta')}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
