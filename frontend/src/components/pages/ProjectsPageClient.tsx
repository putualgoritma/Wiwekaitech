'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useApiData } from '@/hooks/use-api-data';
import type { Project } from '@/lib/api-schemas';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export default function ProjectsPageClient() {
  const t = useTranslations('projects');
  const tCommon = useTranslations('common');
  const { data, loading, error } = useApiData<Project[]>('/projects', { page_size: 12 });

  return (
    <Section>
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <p className="text-green-600 dark:text-green-500 text-sm font-semibold mb-3">
              {t('subtitle')}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg lg:ml-auto mt-6 lg:mt-10">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
              alt="Project delivery team collaboration"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        {loading && (
          <p className="text-center text-secondary-600 dark:text-secondary-400">
            {tCommon('loading')}
          </p>
        )}
        {error && (
          <p className="text-center text-red-500">
            {tCommon('error')}: {error}
          </p>
        )}
        {!loading && !error && (!data || data.length === 0) && (
          <p className="text-center text-secondary-600 dark:text-secondary-400">
            {tCommon('notFound')}
          </p>
        )}

        {data && data.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((project) => {
              const metrics = Array.isArray(project.metrics)
                ? project.metrics
                : project.metrics
                ? [project.metrics]
                : [];

              return (
                <Card key={project.id} hover>
                  <div className="p-6">
                    {project.industry && (
                      <Badge variant="secondary" className="mb-3">
                        {project.industry}
                      </Badge>
                    )}
                    <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                      {project.title}
                    </h2>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      {project.summary}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                          {t('technologies')}:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="primary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {metrics.length > 0 && (
                      <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                        {metrics.map((metric, index) => (
                          <p key={index} className="text-sm text-secondary-700 dark:text-secondary-300 mb-1">
                            ✓ {metric}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}
