import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CspPageClient from './page-client';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'seo.products.csp',
  });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function CspPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <CspPageClient />;
}
