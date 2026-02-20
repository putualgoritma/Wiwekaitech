'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Button from '../shared/Button';

export default function ProductsPreview() {
  const t = useTranslations();
  const locale = useLocale();
  const buildHref = (href: string) => `/${locale}${href}`;

  const products = [
    {
      id: 1,
      title: 'Custom ERP System Development',
      description: 'End-to-end ERP solutions tailored to your business processes.',
      icon: '🏢',
    },
    {
      id: 2,
      title: 'Web-Based Accounting Systems',
      description: 'Complete accounting software with general ledger, AP/AR, and reporting.',
      icon: '💰',
    },
    {
      id: 3,
      title: 'Sales & Inventory Systems',
      description: 'Streamline your sales process and inventory management.',
      icon: '📦',
    },
    {
      id: 4,
      title: 'Manufacturing Platforms',
      description: 'Production management and quality control systems.',
      icon: '🏭',
    },
  ];

  return (
    <Section className="bg-white dark:bg-[#1E1E21]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-green-500 mb-2 text-sm font-semibold">— {t('products.subtitle')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('products.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6 hover:bg-gradient-to-br hover:from-green-400 hover:to-green-600 hover:text-white dark:hover:text-white hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {product.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/90">
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href={buildHref('/products')}>
            <Button variant="primary">{t('products.showAll')}</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
