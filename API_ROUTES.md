# API ROUTES SPECIFICATION

## Base URL

**Development**: `http://localhost:8000`  
**Production**: `https://api.wiwekaitech.com`

## API Version

Version: `v1`  
Prefix: `/api/v1`

---

## Standard Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total_items": 100,
    "total_pages": 10
  }
}
```

---

## 1. Products API

### GET `/api/v1/products`

**Description**: Get all active products  
**Authentication**: None  
**Query Parameters**:
- `lang` (optional): `en` or `id` (default: `en`)
- `limit` (optional): Number of items (default: 50)

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Custom ERP System Development",
      "slug": "custom-erp-development",
      "description": "End-to-end ERP solutions...",
      "icon": "server",
      "features": [
        "Custom workflow design",
        "Multi-module integration",
        "Role-based access control"
      ],
      "display_order": 1
    }
  ]
}
```

### GET `/api/v1/products/{slug}`

**Description**: Get product by slug  
**Authentication**: None  
**Path Parameters**:
- `slug`: Product slug
  
**Query Parameters**:
- `lang` (optional): `en` or `id`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Custom ERP System Development",
    "slug": "custom-erp-development",
    "description": "End-to-end ERP solutions...",
    "icon": "server",
    "features": [...]
  }
}
```

**Error** (404):
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product not found"
  }
}
```

---

## 2. Projects API

### GET `/api/v1/projects`

**Description**: Get all active projects (with pagination)  
**Authentication**: None  
**Query Parameters**:
- `lang` (optional): `en` or `id`
- `page` (optional): Page number (default: 1)
- `page_size` (optional): Items per page (default: 10, max: 50)
- `featured` (optional): `true` to get only featured projects
- `industry` (optional): Filter by industry

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Government ERP & Billing System",
      "slug": "government-erp-billing",
      "summary": "Integrated ERP and billing platform...",
      "client_name": "Regional Government",
      "industry": "Government",
      "technologies": ["FastAPI", "React", "PostgreSQL"],
      "image_url": "/images/projects/gov-erp.webp",
      "metrics": [
        "500+ active users",
        "99.9% uptime"
      ],
      "is_featured": true,
      "completed_date": "2025-08-15"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total_items": 25,
    "total_pages": 3
  }
}
```

### GET `/api/v1/projects/{slug}`

**Description**: Get project detail by slug  
**Authentication**: None  
**Path Parameters**:
- `slug`: Project slug
  
**Query Parameters**:
- `lang` (optional): `en` or `id`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Government ERP & Billing System",
    "slug": "government-erp-billing",
    "summary": "Short summary...",
    "description": "Full detailed description...",
    "client_name": "Regional Government",
    "industry": "Government",
    "technologies": ["FastAPI", "React", "PostgreSQL", "Redis", "Docker"],
    "image_url": "/images/projects/gov-erp.webp",
    "metrics": [
      "500+ active users",
      "99.9% uptime",
      "30% faster processing"
    ],
    "is_featured": true,
    "completed_date": "2025-08-15"
  }
}
```

---

## 3. Tutorials API

### GET `/api/v1/tutorials`

**Description**: Get published tutorials (with pagination)  
**Authentication**: None  
**Query Parameters**:
- `lang` (optional): `en` or `id`
- `page` (optional): Page number (default: 1)
- `page_size` (optional): Items per page (default: 10, max: 50)
- `category_id` (optional): Filter by category
- `difficulty` (optional): `beginner`, `intermediate`, or `advanced`
- `tag` (optional): Filter by tag

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category": {
        "id": 1,
        "name": "FastAPI Development",
        "slug": "fastapi-development"
      },
      "title": "Building a RESTful API with FastAPI and SQLAlchemy",
      "slug": "fastapi-sqlalchemy-rest-api",
      "excerpt": "Learn how to build a production-ready REST API...",
      "difficulty_level": "intermediate",
      "reading_time": 15,
      "image_url": "/images/tutorials/fastapi-rest.webp",
      "tags": ["FastAPI", "SQLAlchemy", "MySQL", "REST API"],
      "published_at": "2026-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total_items": 45,
    "total_pages": 5
  }
}
```

### GET `/api/v1/tutorials/{slug}`

**Description**: Get tutorial detail by slug  
**Authentication**: None  
**Path Parameters**:
- `slug`: Tutorial slug
  
**Query Parameters**:
- `lang` (optional): `en` or `id`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "category": {
      "id": 1,
      "name": "FastAPI Development",
      "slug": "fastapi-development"
    },
    "title": "Building a RESTful API with FastAPI and SQLAlchemy",
    "slug": "fastapi-sqlalchemy-rest-api",
    "excerpt": "Learn how to build...",
    "content": "# Building a RESTful API\n\n## Introduction\n\n...",
    "difficulty_level": "intermediate",
    "reading_time": 15,
    "image_url": "/images/tutorials/fastapi-rest.webp",
    "tags": ["FastAPI", "SQLAlchemy", "MySQL"],
    "published_at": "2026-01-15T10:00:00Z"
  }
}
```

### GET `/api/v1/tutorials/categories`

**Description**: Get all tutorial categories  
**Authentication**: None  
**Query Parameters**:
- `lang` (optional): `en` or `id`

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "FastAPI Development",
      "slug": "fastapi-development"
    },
    {
      "id": 2,
      "name": "Laravel Backend",
      "slug": "laravel-backend"
    }
  ]
}
```

---

## 4. Blog API

### GET `/api/v1/blog`

**Description**: Get published blog posts (with pagination)  
**Authentication**: None  
**Query Parameters**:
- `lang` (optional): `en` or `id`
- `page` (optional): Page number (default: 1)
- `page_size` (optional): Items per page (default: 10, max: 50)
- `category_id` (optional): Filter by category
- `tag` (optional): Filter by tag
- `author` (optional): Filter by author name

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category": {
        "id": 6,
        "name": "Enterprise Software",
        "slug": "enterprise-software"
      },
      "title": "How AI is Transforming Enterprise Software Development",
      "slug": "ai-transforming-enterprise-software",
      "excerpt": "Exploring how tools like ChatGPT...",
      "author_name": "Wiwekaitech Team",
      "reading_time": 8,
      "image_url": "/images/blog/ai-transform.webp",
      "tags": ["AI", "ChatGPT", "GitHub Copilot"],
      "published_at": "2026-02-10T14:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total_items": 30,
    "total_pages": 3
  }
}
```

### GET `/api/v1/blog/{slug}`

**Description**: Get blog post detail by slug  
**Authentication**: None  
**Path Parameters**:
- `slug`: Blog post slug
  
**Query Parameters**:
- `lang` (optional): `en` or `id`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "category": {
      "id": 6,
      "name": "Enterprise Software",
      "slug": "enterprise-software"
    },
    "title": "How AI is Transforming Enterprise Software Development",
    "slug": "ai-transforming-enterprise-software",
    "excerpt": "Exploring how tools...",
    "content": "# How AI is Transforming...\n\n## The New Era\n\n...",
    "author_name": "Wiwekaitech Team",
    "reading_time": 8,
    "image_url": "/images/blog/ai-transform.webp",
    "tags": ["AI", "ChatGPT", "GitHub Copilot"],
    "published_at": "2026-02-10T14:00:00Z"
  }
}
```

### GET `/api/v1/blog/categories`

**Description**: Get all blog categories  
**Authentication**: None  
**Query Parameters**:
- `lang` (optional): `en` or `id`

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 6,
      "name": "Enterprise Software",
      "slug": "enterprise-software"
    },
    {
      "id": 7,
      "name": "Development Best Practices",
      "slug": "development-best-practices"
    }
  ]
}
```

---

## 5. Contact API

### POST `/api/v1/contact`

**Description**: Submit contact form  
**Authentication**: None  
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+6281234567890",
  "company": "ABC Corp",
  "subject": "Inquiry about ERP Development",
  "message": "I'm interested in developing a custom ERP system...",
  "preferred_contact": "email"
}
```

**Validation Rules**:
- `name`: Required, 2-200 characters
- `email`: Required, valid email format
- `phone`: Optional, max 50 characters
- `company`: Optional, max 200 characters
- `subject`: Required, 5-300 characters
- `message`: Required, 20-5000 characters
- `preferred_contact`: Optional, enum: `email`, `phone`, `whatsapp`

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Thank you for contacting us. We will get back to you soon.",
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry about ERP Development",
    "created_at": "2026-02-19T10:30:00Z"
  }
}
```

**Error** (400 Bad Request):
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": ["Invalid email format"],
      "message": ["Message must be at least 20 characters"]
    }
  }
}
```

**Error** (429 Too Many Requests):
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later."
  }
}
```

---

## 6. Health & Info API

### GET `/api/v1/health`

**Description**: API health check  
**Authentication**: None

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-02-19T10:30:00Z",
    "version": "1.0.0"
  }
}
```

### GET `/`

**Description**: API root/welcome  
**Authentication**: None

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Wiwekaitech API v1.0",
  "documentation": "/docs"
}
```

---

## Error Codes Reference

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `PRODUCT_NOT_FOUND` | 404 | Product with given slug not found |
| `PROJECT_NOT_FOUND` | 404 | Project with given slug not found |
| `TUTORIAL_NOT_FOUND` | 404 | Tutorial with given slug not found |
| `BLOG_POST_NOT_FOUND` | 404 | Blog post with given slug not found |
| `CATEGORY_NOT_FOUND` | 404 | Category not found |
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `INVALID_LANGUAGE` | 400 | Invalid language parameter |
| `INVALID_PAGE` | 400 | Invalid page number |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_SERVER_ERROR` | 500 | Internal server error |
| `DATABASE_ERROR` | 500 | Database connection or query error |

---

## CORS Configuration

**Allowed Origins** (Production):
- `https://wiwekaitech.com`
- `https://www.wiwekaitech.com`

**Allowed Origins** (Development):
- `http://localhost:3000`
- `http://localhost:3001`

**Allowed Methods**:
- GET
- POST
- OPTIONS

**Allowed Headers**:
- Content-Type
- Accept
- Accept-Language

---

## Rate Limiting

### Public Endpoints

- **Products**: 100 requests/minute
- **Projects**: 100 requests/minute
- **Tutorials**: 100 requests/minute
- **Blog**: 100 requests/minute

### Contact Endpoint

- **Rate Limit**: 5 requests/hour per IP
- **Burst Limit**: 2 requests/minute

### Health Endpoint

- **No Rate Limit**

---

## API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

---

## Example API Calls

### Get All Products (English)
```bash
curl https://api.wiwekaitech.com/api/v1/products?lang=en
```

### Get Featured Projects
```bash
curl https://api.wiwekaitech.com/api/v1/projects?featured=true&lang=id
```

### Get Tutorial by Slug
```bash
curl https://api.wiwekaitech.com/api/v1/tutorials/fastapi-sqlalchemy-rest-api?lang=en
```

### Submit Contact Form
```bash
curl -X POST https://api.wiwekaitech.com/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "ERP Inquiry",
    "message": "I need a custom ERP system for my manufacturing business."
  }'
```

---

This API specification provides a complete, production-ready REST API for the Wiwekaitech company website.
