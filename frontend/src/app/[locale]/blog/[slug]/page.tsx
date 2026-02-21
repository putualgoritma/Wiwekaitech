import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import BlogDetailClient from '@/components/pages/BlogDetailClient';
import { API_URL } from '@/lib/api';

interface BlogDetailPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

async function getBlogPost(slug: string, lang: string = 'en') {
  try {
    const response = await fetch(`${API_URL}/blog/${slug}?lang=${lang}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params: { locale, slug } }: BlogDetailPageProps): Promise<Metadata> {
  const post = await getBlogPost(slug, locale);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image_url ? [post.image_url] : [],
    },
  };
}

export default async function BlogDetailPage({ params: { locale, slug } }: BlogDetailPageProps) {
  setRequestLocale(locale);
  
  const post = await getBlogPost(slug, locale);
  
  if (!post) {
    notFound();
  }

  return <BlogDetailClient post={post} />;
}
