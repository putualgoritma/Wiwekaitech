import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import TutorialPageClient from '@/components/pages/TutorialPageClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.tutorial' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function TutorialPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <TutorialPageClient />;
}
