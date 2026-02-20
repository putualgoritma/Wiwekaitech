'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useApiData } from '@/hooks/use-api-data';
import type { Product } from '@/lib/api-schemas';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';

export default function ProductsPageClient() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { data, loading, error } = useApiData<Product[]>('/products', { page_size: 50 });

  return (
    <Section>
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <p className="text-green-600 dark:text-green-500 text-sm font-semibold mb-3">
              {t('subtitle')}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg lg:ml-auto mt-6 lg:mt-10">
            <Image
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80"
              alt="Team planning enterprise software"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        {loading && (
          <p className="text-center text-secondary-600 dark:text-secondary-400">
            {tCommon('loading')}
          </p>
        )}
        {error && (
          <p className="text-center text-red-500">
            {tCommon('error')}: {error}
          </p>
        )}
        {!loading && !error && (!data || data.length === 0) && (
          <p className="text-center text-secondary-600 dark:text-secondary-400">
            {tCommon('notFound')}
          </p>
        )}

        {data && data.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((product) => {
              const features = Array.isArray(product.features)
                ? product.features
                : product.features
                ? [product.features]
                : [];

              // Prepend locale to product_url
              const href = product.product_url 
                ? `/${locale}${product.product_url}`
                : '#';

              return (
                <Link key={product.id} href={href}>
                  <Card className="h-full cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="p-6">
                      <div className="text-5xl mb-4">{product.icon || '🧩'}</div>
                      <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-3">
                        {product.title}
                      </h2>
                      <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                        {product.description}
                      </p>
                      {features.length > 0 && (
                        <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                          <h3 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                            Key Features:
                          </h3>
                          <ul className="space-y-1">
                            {features.map((feature, index) => (
                              <li key={index} className="text-sm text-secondary-600 dark:text-secondary-400 flex items-start">
                                <span className="text-primary-600 mr-2">✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}
