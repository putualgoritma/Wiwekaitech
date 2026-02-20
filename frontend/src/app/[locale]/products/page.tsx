import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Card from '@/components/shared/Card';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.products' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ProductsPage() {
  const t = useTranslations('products');

  // Sample products (in real app, fetch from API)
  const products = [
    {
      id: 1,
      title: 'Custom ERP System Development',
      description: 'End-to-end ERP solutions tailored to your business processes, from planning to deployment.',
      icon: '🏢',
      features: ['Custom workflow design', 'Multi-module integration', 'Role-based access', 'Real-time reporting'],
    },
    {
      id: 2,
      title: 'Web-Based Accounting Systems',
      description: 'Complete accounting software with general ledger, AP/AR, financial reporting, and tax compliance.',
      icon: '💰',
      features: ['General ledger', 'Accounts payable/receivable', 'Financial statements', 'Tax reporting'],
    },
    {
      id: 3,
      title: 'Sales & Inventory Systems',
      description: 'Streamline your sales process and inventory management with real-time tracking.',
      icon: '📦',
      features: ['Sales order management', 'Inventory tracking', 'Multi-warehouse support', 'Reporting & analytics'],
    },
    {
      id: 4,
      title: 'Manufacturing Platforms',
      description: 'Production management and quality control systems for manufacturing operations.',
      icon: '🏭',
      features: ['Production planning', 'Quality control', 'Material management', 'Shop floor control'],
    },
    {
      id: 5,
      title: 'Billing Systems',
      description: 'Automated billing and invoice management with payment processing integration.',
      icon: '📄',
      features: ['Invoice generation', 'Payment tracking', 'Recurring billing', 'Multi-currency support'],
    },
    {
      id: 6,
      title: 'API-Driven Applications',
      description: 'Modern RESTful and GraphQL APIs for seamless system integration.',
      icon: '🔌',
      features: ['RESTful API', 'GraphQL', 'Webhook support', 'API documentation'],
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
          {products.map((product) => (
            <Card key={product.id}>
              <div className="p-6">
                <div className="text-5xl mb-4">{product.icon}</div>
                <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-3">
                  {product.title}
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  {product.description}
                </p>
                <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                  <h3 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                    Key Features:
                  </h3>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-sm text-secondary-600 dark:text-secondary-400 flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
