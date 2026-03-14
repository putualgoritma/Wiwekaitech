'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApiData } from '@/hooks/use-api-data';
import type { Product } from '@/lib/api-schemas';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Button from '../shared/Button';

export default function ProductsPreview() {
  const t = useTranslations();
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const buildHref = (href: string) => `/${locale}${href}`;
  const { data: products, loading, error } = useApiData<Product[]>('/products', { page_size: 4 });

  const resolveProductHref = (productUrl: string | null | undefined) => {
    if (!productUrl || productUrl.trim() === '') {
      return buildHref('/products');
    }

    const url = productUrl.trim();
    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    if (/^\/(en|id)\//i.test(url)) {
      return url;
    }

    if (url.startsWith('/')) {
      return `/${locale}${url}`;
    }

    return `/${locale}/${url}`;
  };

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

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
            {tCommon('loading')}
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 mb-10">
            {tCommon('error')}: {error}
          </p>
        )}

        {!loading && !error && products && products.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.slice(0, 4).map((product, index) => {
            const href = resolveProductHref(product.product_url ?? null);
            const external = /^https?:\/\//i.test(href);

            return (
            <Link
              key={product.id}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6 hover:bg-gradient-to-br hover:from-green-400 hover:to-green-600 hover:text-white dark:hover:text-white hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {product.icon || '🧩'}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/90">
                {product.description}
              </p>
            </motion.div>
            </Link>
          );})}
        </div>
        )}

        {!loading && !error && (!products || products.length === 0) && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
            {tCommon('notFound')}
          </p>
        )}

        <div className="text-center">
          <Link href={buildHref('/products')}>
            <Button variant="primary">{t('products.showAll')}</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
