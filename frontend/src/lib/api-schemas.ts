import { z } from 'zod';

/**
 * Zod schemas for API response validation
 * Ensures type-safe runtime validation of API responses
 * Prevents silent failures from malformed API data
 */

// Pagination schema
export const PaginationSchema = z.object({
  page: z.number().int().positive(),
  page_size: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  pages: z.number().int().nonnegative()
});

export type Pagination = z.infer<typeof PaginationSchema>;

// Product schema
export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  icon: z.string(),
  features: z.string().optional(),
  display_order: z.number().int()
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductListResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(ProductSchema),
  pagination: PaginationSchema.optional()
});

// Project schema
export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  description: z.string().optional(),
  client_name: z.string(),
  industry: z.string(),
  technologies: z.array(z.string()),
  image_url: z.string().nullable(),
  metrics: z.array(z.string()),
  is_featured: z.boolean(),
  completed_date: z.string().nullable()
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectListResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(ProjectSchema),
  pagination: PaginationSchema.optional()
});

// Blog Post schema
export const BlogPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string().optional(),
  author_name: z.string(),
  reading_time: z.number().int(),
  image_url: z.string().nullable(),
  tags: z.array(z.string()),
  published_at: z.string().nullable(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string()
  }).nullable()
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

export const BlogListResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(BlogPostSchema),
  pagination: PaginationSchema.optional()
});

// Tutorial schema
export const TutorialSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string().optional(),
  difficulty_level: z.enum(['beginner', 'intermediate', 'advanced']),
  reading_time: z.number().int(),
  image_url: z.string().nullable(),
  tags: z.array(z.string()),
  published_at: z.string().nullable(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string()
  }).nullable()
});

export type Tutorial = z.infer<typeof TutorialSchema>;

export const TutorialListResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(TutorialSchema),
  pagination: PaginationSchema.optional()
});

// Category schema
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string()
});

export type Category = z.infer<typeof CategorySchema>;

export const CategoryListResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(CategorySchema)
});
