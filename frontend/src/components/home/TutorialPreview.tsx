'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Badge from '../shared/Badge';
import Button from '../shared/Button';

export default function TutorialPreview() {
  const t = useTranslations();

  const tutorials = [
    {
      id: 1,
      title: 'Building RESTful API with FastAPI and SQLAlchemy',
      category: 'FastAPI Development',
      difficulty: 'intermediate',
      readingTime: 15,
    },
    {
      id: 2,
      title: 'Designing Scalable Database Schemas for ERP',
      category: 'Database Design',
      difficulty: 'advanced',
      readingTime: 20,
    },
    {
      id: 3,
      title: 'Laravel Best Practices for Enterprise Applications',
      category: 'Laravel Backend',
      difficulty: 'intermediate',
      readingTime: 12,
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
    <Section className="bg-white dark:bg-[#1E1E21]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-green-500 mb-2 text-sm font-semibold">— {t('tutorial.subtitle')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('tutorial.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary">{tutorial.category}</Badge>
                <Badge variant={getDifficultyColor(tutorial.difficulty)}>
                  {t(`tutorial.difficulty.${tutorial.difficulty}`)}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold mb-3">
                {tutorial.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('tutorial.readingTime', { minutes: tutorial.readingTime })}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/tutorial">
            <Button variant="primary">{t('tutorial.showAll')}</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
