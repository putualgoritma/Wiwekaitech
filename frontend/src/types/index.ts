export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  features: string[];
  product_url?: string;
  display_order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description?: string;
  client_name?: string;
  industry?: string;
  technologies: string[];
  image_url?: string;
  metrics: string[];
  is_featured: boolean;
  completed_date?: string;
}

export interface Tutorial {
  id: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  reading_time?: number;
  image_url?: string;
  tags: string[];
  published_at: string;
}

export interface BlogPost {
  id: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  author_name?: string;
  reading_time?: number;
  image_url?: string;
  tags: string[];
  published_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  preferred_contact?: 'email' | 'phone' | 'whatsapp';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}
