/**
 * MDX Utilities
 * Handles markdown file parsing and MDX rendering configuration
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import type { ChapterFrontmatter } from './tutorials/types';

/**
 * Read and parse a markdown file with frontmatter
 */
export async function parseMarkdownFile(filePath: string): Promise<{
  frontmatter: ChapterFrontmatter;
  content: string;
}> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      frontmatter: data as ChapterFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading markdown file: ${filePath}`, error);
    throw error;
  }
}

/**
 * Compile MDX source with all necessary plugins
 */
export async function compileMDX(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['anchor-link'],
            },
          },
        ],
        rehypeHighlight,
      ],
      format: 'mdx',
    },
    parseFrontmatter: false, // We handle this separately with gray-matter
  });

  return mdxSource;
}

/**
 * Check if a markdown file exists
 */
export function markdownFileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * Get the full path to a tutorial chapter markdown file
 */
export function getChapterFilePath(
  bookId: string,
  fileName: string,
  locale: 'en' | 'id' = 'en'
): string {
  const contentDir = path.join(process.cwd(), 'content', bookId, 'chapters');
  
  // Check for locale-specific version first
  if (locale === 'id') {
    const localePath = path.join(contentDir, locale, fileName);
    if (fs.existsSync(localePath)) {
      return localePath;
    }
  }
  
  // Fall back to default (English) version
  return path.join(contentDir, fileName);
}

/**
 * Estimate reading time based on word count
 */
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Extract headings from markdown content
 */
export function extractHeadings(content: string): Array<{
  level: number;
  text: string;
  id: string;
}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({ level, text, id });
  }
  
  return headings;
}
