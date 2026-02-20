'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '../shared/Container';
import Section from '../shared/Section';
import Badge from '../shared/Badge';
import Button from '../shared/Button';

export default function ProjectsPreview() {
  const t = useTranslations();

  const projects = [
    {
      id: 1,
      title: 'Government ERP & Billing System',
      summary: 'Integrated revenue management platform for regional government.',
      industry: 'Government',
      technologies: ['FastAPI', 'React', 'PostgreSQL'],
      metrics: ['500+ users', '99.9% uptime', '30% faster'],
      image: '/images/project-1.png',
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 2,
      title: 'Manufacturing ERP',
      summary: 'Production and inventory management for manufacturing company.',
      industry: 'Manufacturing',
      technologies: ['Laravel', 'Vue.js', 'MySQL'],
      metrics: ['200+ users', '50% cost reduction'],
      image: '/images/project-2.png',
      color: 'from-purple-400 to-purple-600',
    },
    {
      id: 3,
      title: 'Sales & Accounting Platform',
      summary: 'Integrated sales, inventory, and accounting system.',
      industry: 'Retail',
      technologies: ['FastAPI', 'Next.js', 'MySQL'],
      metrics: ['10k+ transactions/day', '99.5% uptime'],
      image: '/images/project-3.png',
      color: 'from-green-400 to-green-600',
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
          <p className="text-green-500 mb-2 text-sm font-semibold">— {t('projects.subtitle')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('projects.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Project Image */}
              <div className={`relative aspect-video bg-gradient-to-br ${project.color}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium opacity-80">Screenshot placeholder</p>
                  </div>
                </div>
                {/* Uncomment when you add project images */}
                {/* <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                /> */}
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
                  {project.metrics.map((metric, index) => (
                    <p key={index} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      ✓ {metric}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/projects">
            <Button variant="primary">{t('projects.showAll')}</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
