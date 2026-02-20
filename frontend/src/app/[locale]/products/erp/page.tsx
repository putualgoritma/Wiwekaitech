import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ErpPageClient from './page-client';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'seo.products.erp',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ErpPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <ErpPageClient />;
}
