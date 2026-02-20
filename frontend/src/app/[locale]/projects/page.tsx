import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.projects' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ProjectsPage() {
  const t = useTranslations('projects');

  // Sample projects (in real app, fetch from API)
  const projects = [
    {
      id: 1,
      title: 'Government ERP & Billing System',
      summary: 'Integrated ERP and billing platform for regional government revenue management.',
      industry: 'Government',
      technologies: ['FastAPI', 'React', 'PostgreSQL', 'Redis', 'Docker'],
      metrics: ['500+ active users', '99.9% uptime', '30% faster processing', '50% cost reduction'],
    },
    {
      id: 2,
      title: 'Manufacturing ERP',
      summary: 'Complete production and inventory management system for manufacturing company.',
      industry: 'Manufacturing',
      technologies: ['Laravel', 'Vue.js', 'MySQL', 'Redis'],
      metrics: ['200+ users', '50% cost reduction', '99.5% uptime'],
    },
    {
      id: 3,
      title: 'Sales & Accounting Platform',
      summary: 'Integrated sales, inventory, and accounting system for retail business.',
      industry: 'Retail',
      technologies: ['FastAPI', 'Next.js', 'MySQL', 'Docker'],
      metrics: ['10k+ transactions/day', '99.5% uptime', '40% efficiency gain'],
    },
    {
      id: 4,
      title: 'Healthcare Management System',
      summary: 'Patient records, appointments, and billing system for healthcare provider.',
      industry: 'Healthcare',
      technologies: ['Laravel', 'React', 'PostgreSQL'],
      metrics: ['5000+ patients', '99.9% uptime', '60% faster processing'],
    },
    {
      id: 5,
      title: 'E-commerce Platform',
      summary: 'Full-featured e-commerce solution with multi-vendor support.',
      industry: 'E-commerce',
      technologies: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis'],
      metrics: ['50k+ products', '1M+ monthly visits', '99.8% uptime'],
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} hover>
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {project.industry}
                </Badge>
                <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  {project.summary}
                </p>
                
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

                <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                  {project.metrics.map((metric, index) => (
                    <p key={index} className="text-sm text-secondary-700 dark:text-secondary-300 mb-1">
                      ✓ {metric}
                    </p>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
