'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Button from '../shared/Button';

export default function BlogPreview() {
  const t = useTranslations();
  const locale = useLocale();
  const buildHref = (href: string) => `/${locale}${href}`;

  const posts = [
    {
      id: 1,
      title: 'How AI is Transforming Enterprise Software Development',
      excerpt: 'Exploring how ChatGPT and GitHub Copilot accelerate development.',
      author: 'Wiwekaitech Team',
      readingTime: 8,
      publishedAt: '2026-02-10',
    },
    {
      id: 2,
      title: 'Best Practices for Building Scalable ERP Systems',
      excerpt: 'Key architectural patterns for enterprise resource planning.',
      author: 'Wiwekaitech Team',
      readingTime: 12,
      publishedAt: '2026-02-05',
    },
  ];

  return (
    <Section className="bg-neutral-50 dark:bg-neutral-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-green-500 mb-2 text-sm font-semibold">— {t('blog.subtitle')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('blog.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-segold mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{post.author}</span>
                <span>{t('blog.readingTime', { minutes: post.readingTime })}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href={buildHref('/blog')}>
            <Button variant="primary">{t('blog.showAll')}</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
