/**
 * Tutorial Utilities
 * Helper functions for working with tutorial structure and navigation
 */

import type {
  TutorialStructure,
  ChapterMetadata,
  NavigationData,
  TableOfContentsData,
  ChapterFrontmatter,
} from './types';

/**
 * Get all chapter slugs from the tutorial structure
 */
export function getAllChapterSlugs(structure: TutorialStructure): string[] {
  const slugs: string[] = [];
  
  structure.parts.forEach((part) => {
    part.chapters.forEach((chapter) => {
      slugs.push(chapter.slug);
    });
  });
  
  return slugs;
}

/**
 * Find a chapter by slug
 */
export function findChapterBySlug(
  structure: TutorialStructure,
  slug: string
): { part: number; chapter: ChapterMetadata; partTitle: { en: string; id: string } } | null {
  for (const part of structure.parts) {
    const chapter = part.chapters.find((ch) => ch.slug === slug);
    if (chapter) {
      return { part: part.number, chapter, partTitle: part.title };
    }
  }
  return null;
}

/**
 * Get navigation data (previous/next chapters) for a given slug
 */
export function getChapterNavigation(
  structure: TutorialStructure,
  currentSlug: string,
  locale: 'en' | 'id' = 'en'
): Omit<NavigationData, 'toc'> {
  const allChapters: Array<{ slug: string; partNumber: number; partTitle: string }> = [];
  
  // Flatten all chapters
  structure.parts.forEach((part) => {
    part.chapters.forEach((chapter) => {
      allChapters.push({
        slug: chapter.slug,
        partNumber: part.number,
        partTitle: part.title[locale],
      });
    });
  });
  
  const currentIndex = allChapters.findIndex((ch) => ch.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previous: undefined, next: undefined };
  }
  
  return {
    previous:
      currentIndex > 0
        ? {
            slug: allChapters[currentIndex - 1].slug,
            title: allChapters[currentIndex - 1].slug, // Will be replaced with actual title
          }
        : undefined,
    next:
      currentIndex < allChapters.length - 1
        ? {
            slug: allChapters[currentIndex + 1].slug,
            title: allChapters[currentIndex + 1].slug, // Will be replaced with actual title
          }
        : undefined,
  };
}

/**
 * Generate table of contents data from structure and frontmatter
 */
export function generateTableOfContents(
  structure: TutorialStructure,
  chaptersFrontmatter: Map<string, ChapterFrontmatter>,
  locale: 'en' | 'id' = 'en'
): TableOfContentsData {
  const parts = structure.parts.map((part) => {
    const chapters = part.chapters.map((chapter) => {
      const frontmatter = chaptersFrontmatter.get(chapter.slug);
      
      return {
        slug: chapter.slug,
        title: frontmatter?.title || chapter.slug,
        chapterNumber: frontmatter?.chapterNumber || 0,
        readingTime: frontmatter?.readingTime || 0,
        difficulty: frontmatter?.difficulty || 'beginner',
      };
    });
    
    return {
      number: part.number,
      title: part.title[locale],
      icon: part.icon,
      chapters,
    };
  });
  
  return { parts };
}

/**
 * Get ordered list of all chapters (flattened)
 */
export function getFlatChapterList(structure: TutorialStructure): ChapterMetadata[] {
  const chapters: ChapterMetadata[] = [];
  
  structure.parts.forEach((part) => {
    part.chapters.forEach((chapter) => {
      chapters.push(chapter);
    });
  });
  
  return chapters;
}
