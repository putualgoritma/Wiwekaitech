'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useTranslations } from 'next-intl';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import ChapterLayout from '@/components/tutorial/ChapterLayout';
import { mdxComponents } from '@/components/tutorial/MDXComponents';
import type { ChapterFrontmatter, NavigationData } from '@/lib/tutorials/types';

interface PythonChapterClientProps {
  frontmatter: ChapterFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
  navigation: NavigationData;
}

export default function PythonChapterClient({
  frontmatter,
  mdxSource,
  navigation,
}: PythonChapterClientProps) {
  const t = useTranslations('pythonBasic.chapter');

  // Create component scope with frontmatter data
  const componentsWithScope = {
    ...mdxComponents,
    // Make frontmatter available to MDX components
    LearningObjectives: (props: any) => {
      const LearningObjectivesComponent = mdxComponents.LearningObjectives;
      return <LearningObjectivesComponent objectives={frontmatter.objectives} {...props} />;
    },
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#1A1A1D]">
      <Container size="lg">
        <Section className="py-12">
          <ChapterLayout frontmatter={frontmatter} navigation={navigation}>
            <MDXRemote 
              {...mdxSource} 
              components={componentsWithScope}
              scope={{ frontmatter }}
            />
          </ChapterLayout>
        </Section>
      </Container>
    </div>
  );
}
