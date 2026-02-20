-- ============================================
-- WIWEKAITECH DATABASE SCHEMA
-- Complete SQL Schema - Ready to Execute
-- ============================================

-- Create Database (run this first in phpMyAdmin SQL tab)
CREATE DATABASE IF NOT EXISTS wiwekaitech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE wiwekaitech;

-- ============================================
-- TABLE 1: CATEGORIES
-- ============================================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_id VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    type ENUM('tutorial', 'blog', 'product') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 2: PRODUCTS
-- ============================================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_id VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description_en TEXT NOT NULL,
    description_id TEXT NOT NULL,
    icon VARCHAR(50),
    features_en JSON,
    features_id JSON,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_active (is_active),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 3: PROJECTS
-- ============================================
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_id VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description_en TEXT NOT NULL,
    description_id TEXT NOT NULL,
    thumbnail VARCHAR(500),
    technologies JSON,
    client_name VARCHAR(255),
    project_url VARCHAR(500),
    github_url VARCHAR(500),
    start_date DATE,
    end_date DATE,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_featured (is_featured),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 4: TUTORIALS
-- ============================================
CREATE TABLE tutorials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_id VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt_en TEXT,
    excerpt_id TEXT,
    content_en LONGTEXT NOT NULL,
    content_id LONGTEXT NOT NULL,
    thumbnail VARCHAR(500),
    difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    duration_minutes INT,
    tags JSON,
    view_count INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_published (is_published),
    INDEX idx_difficulty (difficulty)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 5: BLOG_POSTS
-- ============================================
CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_id VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt_en TEXT,
    excerpt_id TEXT,
    content_en LONGTEXT NOT NULL,
    content_id LONGTEXT NOT NULL,
    thumbnail VARCHAR(500),
    author_name VARCHAR(255),
    author_avatar VARCHAR(500),
    tags JSON,
    view_count INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_published (is_published),
    INDEX idx_published_at (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 6: CONTACTS
-- ============================================
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SAMPLE DATA - CATEGORIES
-- ============================================
INSERT INTO categories (name_en, name_id, slug, type) VALUES
('Web Development', 'Pengembangan Web', 'web-development', 'tutorial'),
('Database Design', 'Desain Database', 'database-design', 'tutorial'),
('FastAPI Tutorial', 'Tutorial FastAPI', 'fastapi-tutorial', 'tutorial'),
('Next.js Tutorial', 'Tutorial Next.js', 'nextjs-tutorial', 'tutorial'),
('Company News', 'Berita Perusahaan', 'company-news', 'blog'),
('Tech Insights', 'Wawasan Teknologi', 'tech-insights', 'blog');

-- ============================================
-- SAMPLE DATA - PRODUCTS
-- ============================================
INSERT INTO products (title_en, title_id, slug, description_en, description_id, icon, features_en, features_id, display_order, is_active) VALUES
(
    'Custom ERP System',
    'Sistem ERP Custom',
    'custom-erp',
    'Comprehensive enterprise resource planning solution tailored to your business needs',
    'Solusi perencanaan sumber daya perusahaan yang komprehensif disesuaikan dengan kebutuhan bisnis Anda',
    '🏢',
    '["Multi-module integration", "Real-time reporting", "Role-based access control", "Scalable architecture"]',
    '["Integrasi multi-modul", "Pelaporan real-time", "Kontrol akses berbasis peran", "Arsitektur yang dapat diskalakan"]',
    1,
    TRUE
),
(
    'Web-Based Accounting',
    'Akuntansi Berbasis Web',
    'web-accounting',
    'Complete accounting system accessible from anywhere with cloud technology',
    'Sistem akuntansi lengkap yang dapat diakses dari mana saja dengan teknologi cloud',
    '💰',
    '["General ledger", "Invoice management", "Financial reports", "Multi-currency support"]',
    '["Buku besar", "Manajemen faktur", "Laporan keuangan", "Dukungan multi-mata uang"]',
    2,
    TRUE
),
(
    'Sales & Inventory System',
    'Sistem Penjualan & Inventori',
    'sales-inventory',
    'Integrated sales and inventory management for retail and wholesale businesses',
    'Manajemen penjualan dan inventori terintegrasi untuk bisnis ritel dan grosir',
    '📦',
    '["Real-time stock tracking", "Point of sale", "Purchase orders", "Warehouse management"]',
    '["Pelacakan stok real-time", "Kasir", "Pesanan pembelian", "Manajemen gudang"]',
    3,
    TRUE
),
(
    'Manufacturing Platform',
    'Platform Manufaktur',
    'manufacturing',
    'End-to-end manufacturing execution system for production planning and control',
    'Sistem eksekusi manufaktur end-to-end untuk perencanaan dan kontrol produksi',
    '🏭',
    '["Production scheduling", "Quality control", "Material tracking", "Equipment monitoring"]',
    '["Penjadwalan produksi", "Kontrol kualitas", "Pelacakan material", "Monitoring peralatan"]',
    4,
    TRUE
);

-- ============================================
-- SAMPLE DATA - PROJECTS
-- ============================================
INSERT INTO projects (title_en, title_id, slug, description_en, description_id, thumbnail, technologies, client_name, project_url, start_date, end_date, is_featured, display_order) VALUES
(
    'Enterprise ERP for Manufacturing Company',
    'ERP Perusahaan untuk Perusahaan Manufaktur',
    'erp-manufacturing-2025',
    'Complete ERP system handling production, inventory, sales, and accounting for a mid-sized manufacturing company',
    'Sistem ERP lengkap yang menangani produksi, inventori, penjualan, dan akuntansi untuk perusahaan manufaktur menengah',
    '/images/projects/erp-manufacturing.jpg',
    '["FastAPI", "Next.js", "PostgreSQL", "Redis", "Docker"]',
    'PT Maju Jaya Manufacturing',
    'https://erp.majujaya.com',
    '2024-06-01',
    '2025-01-15',
    TRUE,
    1
),
(
    'Cloud-Based Accounting System',
    'Sistem Akuntansi Berbasis Cloud',
    'cloud-accounting-2024',
    'Multi-tenant SaaS accounting solution serving 50+ small businesses',
    'Solusi akuntansi SaaS multi-tenant yang melayani 50+ usaha kecil',
    '/images/projects/cloud-accounting.jpg',
    '["Python", "FastAPI", "React", "MySQL", "AWS"]',
    'Akuntanku Platform',
    'https://akuntanku.id',
    '2023-09-01',
    '2024-05-30',
    TRUE,
    2
),
(
    'Retail POS & Inventory System',
    'Sistem POS & Inventori Ritel',
    'retail-pos-2024',
    'Point of sale and inventory management for retail chain with 15 outlets',
    'Kasir dan manajemen inventori untuk rantai ritel dengan 15 gerai',
    '/images/projects/retail-pos.jpg',
    '["FastAPI", "Vue.js", "MySQL", "Redis"]',
    'Toko Elektronik Nusantara',
    NULL,
    '2024-01-15',
    '2024-08-20',
    TRUE,
    3
);

-- ============================================
-- SAMPLE DATA - TUTORIALS
-- ============================================
INSERT INTO tutorials (category_id, title_en, title_id, slug, excerpt_en, excerpt_id, content_en, content_id, thumbnail, difficulty, duration_minutes, tags, is_published, published_at) VALUES
(
    3,
    'Building REST API with FastAPI and SQLAlchemy',
    'Membangun REST API dengan FastAPI dan SQLAlchemy',
    'fastapi-sqlalchemy-rest-api',
    'Learn how to build a production-ready REST API using FastAPI and SQLAlchemy ORM',
    'Pelajari cara membangun REST API yang siap produksi menggunakan FastAPI dan SQLAlchemy ORM',
    '# Building REST API with FastAPI\n\nComplete tutorial content here...',
    '# Membangun REST API dengan FastAPI\n\nKonten tutorial lengkap di sini...',
    '/images/tutorials/fastapi-rest.jpg',
    'intermediate',
    45,
    '["FastAPI", "Python", "SQLAlchemy", "REST API"]',
    TRUE,
    '2025-01-15 10:00:00'
),
(
    4,
    'Next.js 14 App Router Complete Guide',
    'Panduan Lengkap Next.js 14 App Router',
    'nextjs-14-app-router-guide',
    'Master the new App Router in Next.js 14 with this comprehensive guide',
    'Kuasai App Router baru di Next.js 14 dengan panduan komprehensif ini',
    '# Next.js 14 App Router\n\nComplete tutorial content here...',
    '# Next.js 14 App Router\n\nKonten tutorial lengkap di sini...',
    '/images/tutorials/nextjs-router.jpg',
    'intermediate',
    60,
    '["Next.js", "React", "TypeScript", "App Router"]',
    TRUE,
    '2025-02-01 10:00:00'
);

-- ============================================
-- SAMPLE DATA - BLOG POSTS
-- ============================================
INSERT INTO blog_posts (category_id, title_en, title_id, slug, excerpt_en, excerpt_id, content_en, content_id, thumbnail, author_name, author_avatar, tags, is_published, published_at) VALUES
(
    5,
    'How AI-Accelerated Development Helps Us Deliver Faster',
    'Bagaimana Pengembangan Berbasis AI Membantu Kami Menghasilkan Lebih Cepat',
    'ai-accelerated-development-2025',
    'Discover how we leverage ChatGPT and GitHub Copilot to maintain quality while delivering projects 40% faster',
    'Temukan bagaimana kami memanfaatkan ChatGPT dan GitHub Copilot untuk mempertahankan kualitas sambil mengirimkan proyek 40% lebih cepat',
    '# AI-Accelerated Development\n\nComplete blog content here...',
    '# Pengembangan Berbasis AI\n\nKonten blog lengkap di sini...',
    '/images/blog/ai-development.jpg',
    'John Doe',
    '/images/team/john.jpg',
    '["AI", "Development", "Productivity", "ChatGPT"]',
    TRUE,
    '2025-02-10 09:00:00'
),
(
    6,
    'FastAPI vs Django: Which Framework for Your Next Project?',
    'FastAPI vs Django: Framework Mana untuk Proyek Anda Selanjutnya?',
    'fastapi-vs-django-comparison',
    'A comprehensive comparison of FastAPI and Django to help you choose the right framework',
    'Perbandingan komprehensif FastAPI dan Django untuk membantu Anda memilih framework yang tepat',
    '# FastAPI vs Django\n\nComplete blog content here...',
    '# FastAPI vs Django\n\nKonten blog lengkap di sini...',
    '/images/blog/fastapi-django.jpg',
    'Jane Smith',
    '/images/team/jane.jpg',
    '["FastAPI", "Django", "Python", "Comparison"]',
    TRUE,
    '2025-02-12 14:00:00'
);

-- ============================================
-- SAMPLE DATA - CONTACTS (for testing only)
-- ============================================
INSERT INTO contacts (name, email, phone, company, subject, message, status) VALUES
(
    'Test User',
    'test@example.com',
    '+62812345678',
    'Test Company',
    'Inquiry about Custom ERP',
    'I would like to know more about your custom ERP solution.',
    'new'
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify installation:

-- SELECT * FROM categories;
-- SELECT * FROM products;
-- SELECT * FROM projects;
-- SELECT * FROM tutorials;
-- SELECT * FROM blog_posts;
-- SELECT * FROM contacts;

-- ============================================
-- DATABASE SETUP COMPLETE
-- ============================================
