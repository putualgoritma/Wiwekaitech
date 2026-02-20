import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import WhyDifferentSection from '@/components/home/WhyDifferentSection';
import ProductsPreview from '@/components/home/ProductsPreview';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import TutorialPreview from '@/components/home/TutorialPreview';
import BlogPreview from '@/components/home/BlogPreview';
import ContactForm from '@/components/home/ContactForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.home' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <HeroSection />
      <WhyDifferentSection />
      <ProductsPreview />
      <ProjectsPreview />
      <TutorialPreview />
      <BlogPreview />
      <ContactForm />
    </>
  );
}
