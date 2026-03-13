import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import PythonChapterClient from '@/components/pages/PythonChapterClient';
import {
  getPythonChapterSlugs,
  getPythonChapterContent,
  getPythonChapterNavigation,
  pythonBasicStructure,
} from '@/lib/tutorials/python-basic';

interface PythonChapterPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Generate static paths for all chapters
export async function generateStaticParams() {
  const slugs = getPythonChapterSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each chapter
export async function generateMetadata({
  params: { locale, slug },
}: PythonChapterPageProps): Promise<Metadata> {
  const chapterContent = await getPythonChapterContent(
    slug,
    locale as 'en' | 'id'
  );

  if (!chapterContent) {
    return {
      title: 'Chapter Not Found',
    };
  }

  const { frontmatter } = chapterContent;
  const bookTitle = pythonBasicStructure.book.title[locale as 'en' | 'id'];

  return {
    title: `${frontmatter.title} | ${bookTitle}`,
    description:
      frontmatter.summary || `Learn ${frontmatter.title} in this comprehensive Python tutorial chapter.`,
    keywords: [...frontmatter.tags, 'python', 'tutorial', 'programming'].join(', '),
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary || '',
      type: 'article',
      locale: locale,
    },
  };
}

export default async function PythonChapterPage({
  params: { locale, slug },
}: PythonChapterPageProps) {
  setRequestLocale(locale);

  // Load chapter content
  const chapterContent = await getPythonChapterContent(
    slug,
    locale as 'en' | 'id'
  );

  if (!chapterContent) {
    notFound();
  }

  // Get navigation data
  const navigation = await getPythonChapterNavigation(
    slug,
    locale as 'en' | 'id'
  );

  // Parse MDX source (it was serialized for client)
  const mdxSource = JSON.parse(chapterContent.mdxSource);

  return (
    <PythonChapterClient
      frontmatter={chapterContent.frontmatter}
      mdxSource={mdxSource}
      navigation={navigation}
    />
  );
}
