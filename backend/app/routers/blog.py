from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.blog_service import BlogService
from typing import Optional
import math

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("")
async def get_blog_posts(
    lang: str = Query("en", regex="^(en|id)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    category_id: Optional[int] = None,
    tag: Optional[str] = None,
    author: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get published blog posts with pagination and filters"""
    posts, total = BlogService.get_blog_posts(
        db, lang, page, page_size, category_id, tag, author
    )
    
    total_pages = math.ceil(total / page_size)
    
    return {
        "success": True,
        "data": [BlogService.format_blog_post(p, db, lang) for p in posts],
        "pagination": {
            "page": page,
            "page_size": page_size,
            "total_items": total,
            "total_pages": total_pages
        }
    }


@router.get("/categories")
async def get_blog_categories(
    lang: str = Query("en", regex="^(en|id)$"),
    db: Session = Depends(get_db)
):
    """Get all blog categories"""
    categories = BlogService.get_categories(db, lang)
    
    return {
        "success": True,
        "data": categories
    }


@router.get("/{slug}")
async def get_blog_post(
    slug: str,
    lang: str = Query("en", regex="^(en|id)$"),
    db: Session = Depends(get_db)
):
    """Get blog post detail by slug"""
    post = BlogService.get_blog_post_by_slug(db, slug)
    
    if not post:
        raise HTTPException(
            status_code=404,
            detail={
                "success": False,
                "error": {
                    "code": "BLOG_POST_NOT_FOUND",
                    "message": "Blog post not found"
                }
            }
        )
    
    return {
        "success": True,
        "data": BlogService.format_blog_post(post, db, lang, detail=True)
    }
