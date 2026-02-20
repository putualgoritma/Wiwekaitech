import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BlogPageClient from '@/components/pages/BlogPageClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.blog' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function BlogPage() {
  return <BlogPageClient />;
}
