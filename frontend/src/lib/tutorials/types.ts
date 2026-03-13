/**
 * Tutorial Book Type Definitions
 * Defines the structure for tutorial books, chapters, and content
 */

export interface TutorialBookMeta {
  id: string;
  title: {
    en: string;
    id: string;
  };
  slug: string;
  author: string;
  version: string;
  lastUpdated: string;
  description: {
    en: string;
    id: string;
  };
  keywords: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
}

export interface ChapterFrontmatter {
  title: string;
  slug: string;
  chapterNumber: number;
  part: number;
  partTitle: string;
  readingTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  tags: string[];
  locale: 'en' | 'id';
  summary?: string;
  order?: number;
}

export interface ChapterMetadata {
  slug: string;
  file: string;
  order: number;
}

export interface Part {
  number: number;
  title: {
    en: string;
    id: string;
  };
  icon?: string;
  chapters: ChapterMetadata[];
}

export interface TutorialStructure {
  book: TutorialBookMeta;
  parts: Part[];
}

export interface ChapterContent {
  frontmatter: ChapterFrontmatter;
  mdxSource: string;
  slug: string;
}

export interface NavigationData {
  previous?: {
    slug: string;
    title: string;
  };
  next?: {
    slug: string;
    title: string;
  };
  toc: {
    slug: string;
    title: string;
  };
}

export interface TableOfContentsData {
  parts: {
    number: number;
    title: string;
    icon?: string;
    chapters: {
      slug: string;
      title: string;
      chapterNumber: number;
      readingTime: number;
      difficulty: string;
    }[];
  }[];
}

export interface Heading {
  level: number;
  text: string;
  id: string;
}
