from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import products, projects, tutorials, blog, contact

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

# Include routers
app.include_router(products.router, prefix=settings.API_PREFIX)
app.include_router(projects.router, prefix=settings.API_PREFIX)
app.include_router(tutorials.router, prefix=settings.API_PREFIX)
app.include_router(blog.router, prefix=settings.API_PREFIX)
app.include_router(contact.router, prefix=settings.API_PREFIX)


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
