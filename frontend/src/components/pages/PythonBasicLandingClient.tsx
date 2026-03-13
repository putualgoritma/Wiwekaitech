'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import TutorialHero from '@/components/tutorial/TutorialHero';
import LearningPathVisualization from '@/components/tutorial/LearningPathVisualization';
import TableOfContents from '@/components/tutorial/TableOfContents';
import type { TutorialBookMeta, TableOfContentsData } from '@/lib/tutorials/types';

interface PythonBasicLandingClientProps {
  book: TutorialBookMeta;
  toc: TableOfContentsData;
}

export default function PythonBasicLandingClient({
  book,
  toc,
}: PythonBasicLandingClientProps) {
  const t = useTranslations('pythonBasic');
  const tCommon = useTranslations('common');

  const handleStartLearning = () => {
    // Scroll to table of contents
    const tocElement = document.getElementById('table-of-contents');
    if (tocElement) {
      tocElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#1A1A1D]">
      <Container size="xl">
        {/* Hero Section */}
        <Section className="pt-8 pb-12">
          <TutorialHero
            title={t('hero.title')}
            subtitle={t('hero.subtitle')}
            author={book.author}
            lastUpdated={book.lastUpdated}
            onStartLearning={handleStartLearning}
          />
        </Section>

        {/* Book Overview */}
        <Section>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-[#1E1E21] rounded-2xl shadow-lg p-8 border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                About This Book
              </h2>
              <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                {book.description.en}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {book.estimatedHours}h
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                    Estimated Time
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 capitalize">
                    {book.difficulty}
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                    Difficulty Level
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {toc.parts.reduce((sum, part) => sum + part.chapters.length, 0)}
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                    Chapters
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Learning Path */}
        <Section>
          <LearningPathVisualization />
        </Section>

        {/* Table of Contents */}
        <Section id="table-of-contents">
          <Container size="lg">
            <TableOfContents toc={toc} />
          </Container>
        </Section>

        {/* Call to Action */}
        <Section className="pb-16">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Begin with the preface or jump straight into Chapter 1. Take your time, practice regularly, and enjoy the process.
            </p>
            <div className="text-sm opacity-75">
              💡 Remember: The best way to learn programming is to write code every day.
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
