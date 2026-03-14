'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApiData } from '@/hooks/use-api-data';
import type { Project } from '@/lib/api-schemas';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Badge from '../shared/Badge';
import Button from '../shared/Button';

export default function ProjectsPreview() {
  const t = useTranslations();
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const buildHref = (href: string) => `/${locale}${href}`;
  const { data: projects, loading, error } = useApiData<Project[]>('/projects', { page_size: 3 });

  const cardGradients = [
    'from-blue-400 to-blue-600',
    'from-indigo-400 to-indigo-600',
    'from-green-400 to-green-600',
    'from-amber-400 to-amber-600',
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
          <p className="text-green-500 mb-2 text-sm font-semibold">— {t('projects.subtitle')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('projects.title')}
          </h2>
        </motion.div>

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
            {tCommon('loading')}
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 mb-10">
            {tCommon('error')}: {error}
          </p>
        )}

        {!loading && !error && projects && projects.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {projects.map((project, index) => (
            <Link key={project.id} href={buildHref('/projects')}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Project Image */}
              <div className={`relative aspect-video bg-gradient-to-br ${cardGradients[index % cardGradients.length]}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <span className="text-3xl leading-none">{project.icon || '📊'}</span>
                    </div>
                    <p className="text-xs font-medium opacity-80">{project.industry || 'Project'}</p>
                  </div>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <Badge variant="secondary" className="mb-4">
                  {project.industry}
                </Badge>
                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {project.summary}
                </p>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    {t('projects.technologies')}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="primary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-700 pt-4 space-y-1">
                  {(project.metrics || []).slice(0, 3).map((metric, index) => (
                    <p key={index} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      ✓ {metric}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
        )}

        {!loading && !error && (!projects || projects.length === 0) && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
            {tCommon('notFound')}
          </p>
        )}

        <div className="text-center">
          <Link href={buildHref('/projects')}>
            <Button variant="primary">{t('projects.showAll')}</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
