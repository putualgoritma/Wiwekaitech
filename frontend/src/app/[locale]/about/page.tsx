import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.about' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('about');

  return (
    <Section>
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4 text-center">
            {t('title')}
          </h1>
          <p className="text-xl text-center text-primary-600 dark:text-primary-400 mb-12">
            {t('subtitle')}
          </p>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <p className="text-lg text-secondary-700 dark:text-secondary-300">
              {t('description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                {t('mission')}
              </h3>
              <p className="text-secondary-700 dark:text-secondary-300">
                {t('missionText')}
              </p>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                {t('vision')}
              </h3>
              <p className="text-secondary-700 dark:text-secondary-300">
                {t('visionText')}
              </p>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                {t('values')}
              </h3>
              <p className="text-secondary-700 dark:text-secondary-300">
                {t('value1')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border-2 border-primary-200 dark:border-primary-800 rounded-xl">
              <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                {t('value1')}
              </h4>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                {t('value1Text')}
              </p>
            </div>

            <div className="text-center p-6 border-2 border-primary-200 dark:border-primary-800 rounded-xl">
              <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                {t('value2')}
              </h4>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                {t('value2Text')}
              </p>
            </div>

            <div className="text-center p-6 border-2 border-primary-200 dark:border-primary-800 rounded-xl">
              <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                {t('value3')}
              </h4>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                {t('value3Text')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
