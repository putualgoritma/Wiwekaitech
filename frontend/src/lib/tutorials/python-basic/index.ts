/**
 * Python Basic Tutorial - Main Module
 * Provides utilities for working with Python tutorial content
 */

import { pythonBasicStructure } from './structure';
import {
  parseMarkdownFile,
  compileMDX,
  getChapterFilePath,
} from '@/lib/mdx';
import {
  getAllChapterSlugs,
  findChapterBySlug,
  getChapterNavigation,
  generateTableOfContents,
} from '../utils';
import type {
  ChapterContent,
  ChapterFrontmatter,
  NavigationData,
  TableOfContentsData,
} from '../types';

/**
 * Get all chapter slugs for static path generation
 */
export function getPythonChapterSlugs(): string[] {
  return getAllChapterSlugs(pythonBasicStructure);
}

/**
 * Load and compile a chapter by slug
 */
export async function getPythonChapterContent(
  slug: string,
  locale: 'en' | 'id' = 'en'
): Promise<ChapterContent | null> {
  try {
    // Find chapter in structure
    const chapterInfo = findChapterBySlug(pythonBasicStructure, slug);
    if (!chapterInfo) {
      return null;
    }

    // Get file path
    const filePath = getChapterFilePath(
      pythonBasicStructure.book.id,
      chapterInfo.chapter.file,
      locale
    );

    // Parse markdown file
    const { frontmatter, content } = await parseMarkdownFile(filePath);

    // Compile MDX
    const mdxSource = await compileMDX(content);

    return {
      frontmatter: {
        ...frontmatter,
        partTitle: chapterInfo.partTitle[locale],
      },
      mdxSource: JSON.stringify(mdxSource), // Serialize for client component
      slug,
    };
  } catch (error) {
    console.error(`Error loading chapter ${slug}:`, error);
    return null;
  }
}

/**
 * Get navigation data for a chapter
 */
export async function getPythonChapterNavigation(
  slug: string,
  locale: 'en' | 'id' = 'en'
): Promise<NavigationData> {
  const baseNav = getChapterNavigation(pythonBasicStructure, slug, locale);

  // Load frontmatter for prev/next to get actual titles
  const navigation: NavigationData = {
    previous: baseNav.previous
      ? {
          slug: baseNav.previous.slug,
          title: baseNav.previous.slug, // Default to slug
        }
      : undefined,
    next: baseNav.next
      ? {
          slug: baseNav.next.slug,
          title: baseNav.next.slug, // Default to slug
        }
      : undefined,
    toc: {
      slug: `/tutorial/python-basic`,
      title: 'Table of Contents',
    },
  };

  // Try to load actual titles
  try {
    if (navigation.previous) {
      const prevContent = await getPythonChapterContent(
        navigation.previous.slug,
        locale
      );
      if (prevContent) {
        navigation.previous.title = prevContent.frontmatter.title;
      }
    }

    if (navigation.next) {
      const nextContent = await getPythonChapterContent(
        navigation.next.slug,
        locale
      );
      if (nextContent) {
        navigation.next.title = nextContent.frontmatter.title;
      }
    }
  } catch (error) {
    console.error('Error loading navigation titles:', error);
  }

  return navigation;
}

/**
 * Generate table of contents for the Python tutorial
 */
export async function getPythonTableOfContents(
  locale: 'en' | 'id' = 'en'
): Promise<TableOfContentsData> {
  // Load all chapter frontmatter
  const chaptersFrontmatter = new Map<string, ChapterFrontmatter>();

  for (const slug of getPythonChapterSlugs()) {
    try {
      const content = await getPythonChapterContent(slug, locale);
      if (content) {
        chaptersFrontmatter.set(slug, content.frontmatter);
      }
    } catch (error) {
      console.error(`Error loading frontmatter for ${slug}:`, error);
    }
  }

  return generateTableOfContents(
    pythonBasicStructure,
    chaptersFrontmatter,
    locale
  );
}

/**
 * Export structure for client components
 */
export { pythonBasicStructure };
