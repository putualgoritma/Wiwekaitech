# Wiwekaitech Company Website

Complete, production-ready company website for a custom ERP & enterprise software development company.

## 🎯 Project Overview

This is a **full-stack, production-ready** implementation featuring:
- Modern Next.js 14 frontend with bilingual support
- FastAPI backend with MySQL database
- Complete SEO optimization
- Enterprise-grade architecture
- AI-accelerated development positioning

## 📁 Project Structure

```
wiwekaitech-copilot/
├── ARCHITECTURE.md          # Master architecture plan
├── DATABASE_SCHEMA.md       # Complete database schema
├── API_ROUTES.md            # API specification
├── plan.md                  # Original requirements
├── frontend/                # Next.js application
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities & API client
│   │   ├── messages/       # i18n translations (en/id)
│   │   └── types/          # TypeScript types
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── README.md
└── backend/                 # FastAPI application
    ├── app/
    │   ├── main.py         # FastAPI app entry
    │   ├── config.py       # Configuration
    │   ├── database.py     # Database connection
    │   ├── models/         # SQLAlchemy models
    │   ├── schemas/        # Pydantic schemas
    │   ├── routers/        # API endpoints
    │   └── services/       # Business logic
    ├── requirements.txt
    └── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- MySQL 8.0+

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Update .env.local with your API URL
npm run dev
# Open http://localhost:3000
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Update .env with database credentials
# Create database: CREATE DATABASE wiwekaitech;
uvicorn app.main:app --reload
# API at http://localhost:8000
# Docs at http://localhost:8000/docs
```

## 🌐 Features

### Frontend
✅ Next.js 14 with App Router  
✅ TypeScript  
✅ Tailwind CSS  
✅ Bilingual (English/Indonesian)  
✅ SEO optimized  
✅ Responsive design  
✅ Dark mode support  

### Backend
✅ FastAPI framework  
✅ SQLAlchemy ORM  
✅ MySQL database  
✅ Pydantic validation  
✅ RESTful API  
✅ Auto-generated docs  
✅ CORS configured  

### Pages
- **/** - Home with all preview sections
- **/about** - About the company
- **/products** - Service offerings
- **/projects** - Portfolio showcase
- **/tutorial** - Coding tutorials
- **/blog** - Technical articles
- **/contact** - Contact form

## 📊 Database Schema

6 main tables:
- `categories` - Tutorial & blog categories
- `products` - Service offerings
- `projects` - Portfolio projects
- `tutorials` - Coding tutorials
- `blog_posts` - Blog articles
- `contact_messages` - Contact submissions

See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for complete schema with SQL.

## 🔌 API Endpoints

All endpoints support bilingual content via `?lang=en` or `?lang=id`

**Products:**
- `GET /api/v1/products`
- `GET /api/v1/products/{slug}`

**Projects:**
- `GET /api/v1/projects`
- `GET /api/v1/projects/{slug}`

**Tutorials:**
- `GET /api/v1/tutorials`
- `GET /api/v1/tutorials/categories`
- `GET /api/v1/tutorials/{slug}`

**Blog:**
- `GET /api/v1/blog`
- `GET /api/v1/blog/categories`
- `GET /api/v1/blog/{slug}`

**Contact:**
- `POST /api/v1/contact`

See [API_ROUTES.md](API_ROUTES.md) for complete API documentation.

## 🎨 Design

Modern, professional enterprise design with:
- Clean professional SaaS-level UI
- Section-based layout
- Smooth animations
- Card-based layouts
- Mobile-first responsive
- Inspired by: https://portfolio-yt-2026.vercel.app/

## 🏢 Company Positioning

**Differentiator:** AI-Accelerated Enterprise Development

We deliver faster than traditional companies by combining:
- 10+ years enterprise system experience  
- AI tools (ChatGPT, GitHub Copilot, Cursor)  
- Clean architecture principles  

**Focus:**
- Custom ERP Development
- Web-Based Accounting Systems
- Sales & Inventory Systems
- Manufacturing Platforms

## 🌍 Multi-Language

Full bilingual support:
- URL structure: `/en/...` and `/id/...`
- Separate translation files
- Localized metadata
- SEO per language

## 📱 SEO Strategy

**Target Keywords:**
- Custom ERP Development
- Web-Based Accounting System
- ERP Software Company
- FastAPI Development
- Enterprise Software Development

**Implementation:**
- Semantic HTML5
- Meta tags per page
- OpenGraph tags
- Structured data ready
- Clean URL structure
- Internal linking

## 🚀 Deployment

### Frontend (Vercel Recommended)
```bash
cd frontend
npm run build
npm run start
```

### Backend (VPS/AWS)
```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Database
- MySQL 8.0+
- Character set: utf8mb4
- Daily backups recommended

## 📦 Tech Stack

**Frontend:**
- Next.js 14
- TypeScript
- Tailwind CSS
- next-intl
- Zod

**Backend:**
- FastAPI
- SQLAlchemy 2.0
- Pydantic V2
- PyMySQL
- Alembic

**Database:**
- MySQL 8.0

## 📝 Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Complete architecture plan
- [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) - Database design & SQL
- [API_ROUTES.md](API_ROUTES.md) - API specification
- [frontend/README.md](frontend/README.md) - Frontend docs
- [backend/README.md](backend/README.md) - Backend docs

## ✅ Implementation Status

**Phase 1 - Architecture:** ✅ Complete
- Master architecture plan
- Database schema design
- API routes specification

**Phase 2 - Frontend:** ✅ Complete
- Next.js project setup
- i18n configuration
- All components
- All pages
- SEO metadata

**Phase 3 - Backend:** ✅ Complete
- FastAPI project setup
- Database models
- API routers
- Business logic services
- CRUD operations

## 🔒 Security

- Environment-based configuration
- Input validation with Pydantic
- CORS properly configured
- SQL injection prevention (ORM)
- Rate limiting ready

## 📄 License

© 2026 Wiwekaitech. All rights reserved.

---

**Note:** This is a complete, production-ready implementation. No scaffolding, no placeholders. Ready to deploy with data seeding.
