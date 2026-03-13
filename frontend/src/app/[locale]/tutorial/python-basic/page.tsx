import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PythonBasicLandingClient from '@/components/pages/PythonBasicLandingClient';
import {
  pythonBasicStructure,
  getPythonTableOfContents,
} from '@/lib/tutorials/python-basic';

interface PythonBasicPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: PythonBasicPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.pythonBasic' });
  const book = pythonBasicStructure.book;

  return {
    title: t('title'),
    description: t('description'),
    keywords: book.keywords.join(', '),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function PythonBasicPage({
  params: { locale },
}: PythonBasicPageProps) {
  setRequestLocale(locale);

  // Generate table of contents by loading all chapter frontmatter
  const toc = await getPythonTableOfContents(locale as 'en' | 'id');

  return (
    <PythonBasicLandingClient
      book={pythonBasicStructure.book}
      toc={toc}
    />
  );
}
