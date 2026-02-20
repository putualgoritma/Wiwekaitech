# Wiwekaitech Backend API

Production-ready FastAPI backend for Wiwekaitech company website.

## Features

- ✅ FastAPI framework
- ✅ SQLAlchemy ORM
- ✅ MySQL database
- ✅ Pydantic validation
- ✅ RESTful API design
- ✅ Bilingual content support
- ✅ CORS configured
- ✅ Auto-generated API docs

## Getting Started

### Prerequisites

- Python 3.10+
- MySQL 8.0+
- pip

### Installation

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Update .env with your database credentials
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/wiwekaitech
```

### Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE wiwekaitech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Run migrations (if using Alembic)
alembic upgrade head

# Or create tables directly
python -c "from app.database import engine, Base; from app.models import *; Base.metadata.create_all(bind=engine)"
```

### Run Development Server

```bash
# Start server
uvicorn app.main:app --reload

# API will be available at http://localhost:8000
# Swagger docs at http://localhost:8000/docs
# ReDoc at http://localhost:8000/redoc
```

### Run Production Server

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Project Structure

```
app/
├── main.py           # FastAPI application
├── config.py         # Configuration
├── database.py       # Database connection
├── models/           # SQLAlchemy models
├── schemas/          # Pydantic schemas
├── routers/          # API endpoints
└── services/         # Business logic
```

## API Endpoints

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/{slug}` - Get product by slug

### Projects
- `GET /api/v1/projects` - Get projects (paginated)
- `GET /api/v1/projects/{slug}` - Get project by slug

### Tutorials
- `GET /api/v1/tutorials` - Get tutorials (paginated)
- `GET /api/v1/tutorials/categories` - Get tutorial categories
- `GET /api/v1/tutorials/{slug}` - Get tutorial by slug

### Blog
- `GET /api/v1/blog` - Get blog posts (paginated)
- `GET /api/v1/blog/categories` - Get blog categories
- `GET /api/v1/blog/{slug}` - Get blog post by slug

### Contact
- `POST /api/v1/contact` - Submit contact form

### Health
- `GET /api/v1/health` - Health check

## Environment Variables

```env
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/wiwekaitech
CORS_ORIGINS=http://localhost:3000,https://wiwekaitech.com
ENVIRONMENT=production
API_PREFIX=/api/v1
```

## Database Schema

See [DATABASE_SCHEMA.md](../DATABASE_SCHEMA.md) for complete database schema documentation.

## Deployment

### Using Supervisor

```ini
[program:wiwekaitech-api]
command=/path/to/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
directory=/path/to/backend
autostart=true
autorestart=true
stderr_logfile=/var/log/wiwekaitech-api.err.log
stdout_logfile=/var/log/wiwekaitech-api.out.log
```

### Using Docker

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## License

© 2026 Wiwekaitech. All rights reserved.
