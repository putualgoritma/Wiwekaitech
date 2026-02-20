import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.blog' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function BlogPage() {
  const t = useTranslations('blog');

  // Sample blog posts (in real app, fetch from API)
  const posts = [
    {
      id: 1,
      title: 'How AI is Transforming Enterprise Software Development',
      excerpt: 'Exploring how tools like ChatGPT and GitHub Copilot are accelerating development while maintaining quality.',
      author: 'Wiwekaitech Team',
      readingTime: 8,
      publishedAt: 'February 10, 2026',
    },
    {
      id: 2,
      title: 'Best Practices for Building Scalable ERP Systems',
      excerpt: 'Key architectural patterns and design principles for enterprise resource planning systems.',
      author: 'Wiwekaitech Team',
      readingTime: 12,
      publishedAt: 'February 5, 2026',
    },
    {
      id: 3,
      title: 'Why Your Business Needs a Custom ERP Solution',
      excerpt: 'Understanding the benefits of custom-built ERP systems versus off-the-shelf solutions.',
      author: 'Wiwekaitech Team',
      readingTime: 7,
      publishedAt: 'January 28, 2026',
    },
    {
      id: 4,
      title: 'Database Optimization for High-Performance Applications',
      excerpt: 'Techniques for optimizing database queries and schema design for enterprise applications.',
      author: 'Wiwekaitech Team',
      readingTime: 10,
      publishedAt: 'January 20, 2026',
    },
  ];

  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {posts.map((post) => (
            <Card key={post.id} hover>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400">
                  <span>{t('by')} {post.author} {t('on')} {post.publishedAt}</span>
                  <span>{t('readingTime', { minutes: post.readingTime })}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
