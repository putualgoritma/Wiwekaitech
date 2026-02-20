# PHASE 1: MASTER ARCHITECTURE PLAN

## Project Overview

**Company**: Wiwekaitech - Custom ERP & Enterprise Software Development Company  
**Project Type**: Production-ready company website  
**Tech Stack**: Next.js + FastAPI + MySQL  
**Languages**: English & Bahasa Indonesia  
**Deployment**: Frontend (Vercel/AWS), Backend (VPS/AWS), Database (MySQL)

---

## Frontend Architecture (Next.js)

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **SEO**: Next.js Metadata API
- **Validation**: Zod
- **HTTP Client**: Fetch API / Axios
- **Animations**: Framer Motion (optional)

### Folder Structure

```
frontend/
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.webp
│   │   └── projects/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx              # Root layout with locale
│   │   │   ├── page.tsx                # Home page
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── tutorial/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts            # Contact form API route
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── WhyDifferentSection.tsx
│   │   │   ├── ProductsPreview.tsx
│   │   │   ├── ProjectsPreview.tsx
│   │   │   ├── TutorialPreview.tsx
│   │   │   ├── BlogPreview.tsx
│   │   │   └── ContactCTA.tsx
│   │   ├── shared/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   └── Badge.tsx
│   │   ├── forms/
│   │   │   └── ContactForm.tsx
│   │   └── ui/
│   │       ├── Loader.tsx
│   │       └── ErrorBoundary.tsx
│   ├── lib/
│   │   ├── api.ts                      # API client
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── project.ts
│   │   ├── blog.ts
│   │   ├── tutorial.ts
│   │   └── product.ts
│   ├── messages/
│   │   ├── en.json
│   │   └── id.json
│   └── i18n.ts
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Backend Architecture (FastAPI)

### Technology Stack

- **Framework**: FastAPI
- **Language**: Python 3.10+
- **ORM**: SQLAlchemy 2.0
- **Validation**: Pydantic V2
- **Database**: MySQL 8.0
- **Migration**: Alembic
- **Authentication**: JWT (future)
- **CORS**: FastAPI middleware
- **Environment**: python-dotenv

### Folder Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                         # FastAPI app entry point
│   ├── config.py                       # Configuration & environment
│   ├── database.py                     # Database connection
│   ├── models/
│   │   ├── __init__.py
│   │   ├── project.py
│   │   ├── blog.py
│   │   ├── tutorial.py
│   │   ├── product.py
│   │   └── contact.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── project.py
│   │   ├── blog.py
│   │   ├── tutorial.py
│   │   ├── product.py
│   │   └── contact.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── projects.py
│   │   ├── blog.py
│   │   ├── tutorial.py
│   │   ├── products.py
│   │   └── contact.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── project_service.py
│   │   ├── blog_service.py
│   │   ├── tutorial_service.py
│   │   ├── product_service.py
│   │   └── contact_service.py
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
├── alembic/
│   ├── versions/
│   └── env.py
├── tests/
│   ├── __init__.py
│   └── test_api.py
├── .env
├── .env.example
├── requirements.txt
├── alembic.ini
└── README.md
```

---

## Internationalization (i18n) Strategy

### URL Structure

```
/en/                    → English home
/en/about              → English about
/en/products           → English products
/en/projects           → English projects
/en/projects/[slug]    → English project detail
/en/tutorial           → English tutorial
/en/tutorial/[slug]    → English tutorial detail
/en/blog               → English blog
/en/blog/[slug]        → English blog post
/en/contact            → English contact

/id/                    → Indonesian home
/id/about              → Indonesian about
... (same structure)
```

### Translation File Structure

**messages/en.json**
```json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "products": "Our Products",
    "projects": "Projects Portfolio",
    "tutorial": "Coding Tutorial",
    "blog": "Blog",
    "contact": "Contact"
  },
  "hero": {
    "title": "Custom Web Application & ERP Development Company",
    "subtitle": "We build scalable ERP systems, accounting systems, sales platforms, and enterprise web applications tailored to your business workflow.",
    "cta1": "View Our Projects",
    "cta2": "Start Your Project"
  },
  ...
}
```

**messages/id.json**
```json
{
  "nav": {
    "home": "Beranda",
    "about": "Tentang Kami",
    "products": "Produk Kami",
    "projects": "Portfolio Proyek",
    "tutorial": "Tutorial Coding",
    "blog": "Blog",
    "contact": "Kontak"
  },
  "hero": {
    "title": "Perusahaan Pengembangan Aplikasi Web & ERP Custom",
    "subtitle": "Kami membangun sistem ERP, sistem akuntansi, platform penjualan, dan aplikasi web enterprise yang disesuaikan dengan alur bisnis Anda.",
    "cta1": "Lihat Proyek Kami",
    "cta2": "Mulai Proyek Anda"
  },
  ...
}
```

### SEO Per Language

Each page will have localized metadata:
- Title (en/id)
- Description (en/id)
- OpenGraph tags
- hreflang tags for alternate languages

---

## SEO Strategy

### Primary Keywords

1. **Custom ERP Development**
2. **Web-Based Accounting System**
3. **ERP Software Company**
4. **FastAPI Development**
5. **Custom Web Application Development**
6. **Sales & Inventory Management Software**
7. **Manufacturing ERP System**
8. **Enterprise Software Development**

### On-Page SEO Requirements

✅ One H1 per page  
✅ Structured H2, H3 hierarchy  
✅ Meta title (50-60 characters)  
✅ Meta description (150-160 characters)  
✅ OpenGraph tags (og:title, og:description, og:image)  
✅ Twitter Card tags  
✅ Semantic HTML5 (article, section, nav, main, footer)  
✅ Alt text for all images  
✅ Internal linking structure  
✅ Breadcrumbs  
✅ Sitemap.xml  
✅ Robots.txt  
✅ Structured data (JSON-LD) for Organization, Articles  

### Content Strategy

**Home Page (Priority 1)**
- Target: "Custom ERP Development Company"
- H1: "Custom Web Application & ERP Development Company"
- Focus: Trust, differentiation, AI-accelerated development

**Products Page (Priority 2)**
- Target: "ERP Software Solutions"
- H1: "Enterprise Software Solutions We Build"
- Focus: Product categories, use cases

**Projects Portfolio (Priority 2)**
- Target: "ERP Implementation Case Studies"
- H1: "Our ERP & Enterprise Software Projects"
- Focus: Real results, metrics, industries

**Tutorial Page (Priority 3)**
- Target: "FastAPI Tutorial", "ERP Development Tutorial"
- H1: "Learn to Build Scalable ERP Systems"
- Focus: Technical content, long-tail keywords

**Blog (Priority 3)**
- Target: Various technical topics
- Focus: Thought leadership, technical SEO

---

## Performance & Optimization

### Frontend Optimization

- ✅ Image optimization (Next.js Image component)
- ✅ Code splitting (automatic with App Router)
- ✅ Static generation where possible
- ✅ Dynamic imports for heavy components
- ✅ Font optimization (next/font)
- ✅ CSS purging (Tailwind)
- ✅ Lazy loading images
- ✅ Minification (production build)

### Backend Optimization

- ✅ Database indexing (covered in schema)
- ✅ Query optimization (SQLAlchemy lazy loading)
- ✅ Response caching (future: Redis)
- ✅ Pagination for large datasets
- ✅ GZIP compression
- ✅ Connection pooling

---

## Deployment Strategy

### Frontend Deployment (Vercel)

```bash
# Environment variables needed:
NEXT_PUBLIC_API_URL=https://api.wiwekaitech.com
NEXT_PUBLIC_SITE_URL=https://wiwekaitech.com
```

**Build command**: `npm run build`  
**Output directory**: `.next`  
**Node version**: 18.x or higher

### Backend Deployment (VPS/AWS)

```bash
# Environment variables needed:
DATABASE_URL=mysql+pymysql://user:pass@localhost:3306/wiwekaitech
CORS_ORIGINS=https://wiwekaitech.com,https://www.wiwekaitech.com
ENVIRONMENT=production
```

**Run command**: `uvicorn app.main:app --host 0.0.0.0 --port 8000`  
**Process manager**: Supervisor or PM2  
**Reverse proxy**: Nginx

### Database (MySQL)

- **Version**: MySQL 8.0+
- **Character Set**: utf8mb4
- **Collation**: utf8mb4_unicode_ci
- **Timezone**: UTC
- **Backup**: Daily automated backups

---

## Security Considerations

### Frontend

- ✅ Environment variables for sensitive data
- ✅ Input validation on forms
- ✅ Sanitize user inputs
- ✅ HTTPS only
- ✅ Content Security Policy headers

### Backend

- ✅ CORS configuration
- ✅ Rate limiting (future: slowapi)
- ✅ SQL injection prevention (SQLAlchemy ORM)
- ✅ Input validation (Pydantic)
- ✅ Environment-based configuration
- ✅ Sensitive data in .env (not committed)

---

## Development Workflow

### Frontend Development

```bash
cd frontend
npm install
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
```

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload  # Development server (http://localhost:8000)
```

### Database Migrations

```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

---

## Next Steps

✅ **Phase 1 Complete**: Architecture defined  
⏭️ **Phase 2**: Frontend implementation  
⏭️ **Phase 3**: Backend implementation  

This document serves as the master reference for the entire project implementation.
