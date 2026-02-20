import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProductsPageClient from '@/components/pages/ProductsPageClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.products' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ProductsPageClient />;
}
