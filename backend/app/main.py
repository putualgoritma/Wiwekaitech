from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from app.config import settings
from app.database import engine, Base
from app.routers import products, projects, tutorials, blog, contact, auth
from app.routers import admin_products, admin_projects, admin_tutorials, admin_blog, admin_users, admin_templates
import os

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Wiwekaitech API",
    description="API for Wiwekaitech company website",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Include public API routers
app.include_router(products.router, prefix=settings.API_PREFIX)
app.include_router(projects.router, prefix=settings.API_PREFIX)
app.include_router(tutorials.router, prefix=settings.API_PREFIX)
app.include_router(blog.router, prefix=settings.API_PREFIX)
app.include_router(contact.router, prefix=settings.API_PREFIX)

# Include auth routers
app.include_router(auth.router, prefix=settings.API_PREFIX)

# Include admin CRUD routers
app.include_router(admin_products.router, prefix=f"{settings.API_PREFIX}/admin")
app.include_router(admin_projects.router, prefix=f"{settings.API_PREFIX}/admin")
app.include_router(admin_tutorials.router, prefix=f"{settings.API_PREFIX}/admin")
app.include_router(admin_blog.router, prefix=f"{settings.API_PREFIX}/admin")
app.include_router(admin_users.router, prefix=f"{settings.API_PREFIX}/admin")

# Include admin template routes (for rendering HTML)
app.include_router(admin_templates.router)


@app.get("/")
async def root():
    """API root endpoint"""
    return {
        "success": True,
        "message": "Wiwekaitech API v1.0",
        "documentation": "/docs"
    }


@app.get(f"{settings.API_PREFIX}/health")
async def health_check():
    """Health check endpoint"""
    return {
        "success": True,
        "data": {
            "status": "healthy",
            "version": "1.0.0"
        }
    }
