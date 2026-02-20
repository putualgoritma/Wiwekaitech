import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.tutorial' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function TutorialPage() {
  const t = useTranslations('tutorial');

  // Sample tutorials (in real app, fetch from API)
  const tutorials = [
    {
      id: 1,
      title: 'Building a RESTful API with FastAPI and SQLAlchemy',
      category: 'FastAPI Development',
      difficulty: 'intermediate',
      readingTime: 15,
      excerpt: 'Learn how to build a production-ready REST API using FastAPI, SQLAlchemy, and MySQL.',
    },
    {
      id: 2,
      title: 'Designing Scalable Database Schemas for ERP',
      category: 'Database Design',
      difficulty: 'advanced',
      readingTime: 20,
      excerpt: 'Best practices for designing database schemas that scale with your business.',
    },
    {
      id: 3,
      title: 'Laravel Best Practices for Enterprise Applications',
      category: 'Laravel Backend',
      difficulty: 'intermediate',
      readingTime: 12,
      excerpt: 'Enterprise-grade Laravel development patterns and practices.',
    },
    {
      id: 4,
      title: 'Introduction to ERP Architecture',
      category: 'ERP Architecture',
      difficulty: 'beginner',
      readingTime: 10,
      excerpt: 'Understanding the core concepts and architecture of ERP systems.',
    },
    {
      id: 5,
      title: 'Using AI Tools in Software Development',
      category: 'AI in Development',
      difficulty: 'beginner',
      readingTime: 8,
      excerpt: 'How to leverage ChatGPT and GitHub Copilot for faster development.',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'secondary';
    }
  };

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} hover>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{tutorial.category}</Badge>
                  <Badge variant={getDifficultyColor(tutorial.difficulty) as any}>
                    {t(`difficulty.${tutorial.difficulty}`)}
                  </Badge>
                </div>
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                  {tutorial.title}
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4 text-sm">
                  {tutorial.excerpt}
                </p>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                  {t('readingTime', { minutes: tutorial.readingTime })}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
