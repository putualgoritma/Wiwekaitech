import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
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
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80"
              alt="Business handshake meeting"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
