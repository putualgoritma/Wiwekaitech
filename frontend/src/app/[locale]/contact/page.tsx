import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import ContactForm from '@/components/forms/ContactForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.contact' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <Section>
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              {t('subtitle')}
            </p>
          </div>

          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
