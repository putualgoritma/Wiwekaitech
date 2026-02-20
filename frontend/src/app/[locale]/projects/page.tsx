import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ProjectsPageClient from '@/components/pages/ProjectsPageClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.projects' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
