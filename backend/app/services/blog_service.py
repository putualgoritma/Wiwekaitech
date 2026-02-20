from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import BlogPost, Category
from typing import List, Optional, Tuple
from app.utils.formatters import BaseFormatter
from app.utils.pagination import PaginationParams, paginate, build_paginated_response
from app.services.category_service import CategoryService


class BlogService:
    @staticmethod
    def get_blog_posts(
        db: Session,
        lang: str = "en",
        params: Optional[PaginationParams] = None,
        category_id: Optional[int] = None,
        tag: Optional[str] = None,
        author: Optional[str] = None
    ) -> Tuple[List[BlogPost], int]:
        """Get published blog posts with filters and pagination"""
        if params is None:
            params = PaginationParams()
        
        query = db.query(BlogPost).filter(BlogPost.is_published == True)
        
        if category_id:
            query = query.filter(BlogPost.category_id == category_id)
        
        if author:
            query = query.filter(BlogPost.author_name == author)
        
        # Apply pagination
        items, total = paginate(
            query.order_by(desc(BlogPost.published_at)),
            params
        )
        
        return items, total
    
    @staticmethod
    def get_blog_post_by_slug(db: Session, slug: str) -> Optional[BlogPost]:
        """Get blog post by slug"""
        return db.query(BlogPost).filter(
            BlogPost.slug == slug,
            BlogPost.is_published == True
        ).first()
    
    @staticmethod
    def format(post: BlogPost, db: Session, lang: str = "en", detail: bool = False) -> dict:
        """Format blog post for response using centralized formatter"""
        category = CategoryService.get_category(db, post.category_id, lang) if post.category_id else None
        
        data = {
            "id": post.id,
            "category": category,
            **BaseFormatter.format_translations(
                post, ["title", "excerpt", "content"], lang
            ),
            "slug": post.slug,
            "author_name": post.author_name,
            "reading_time": post.reading_time,
            "image_url": post.image_url,
            "tags": post.tags or [],
            "published_at": post.published_at.isoformat() if post.published_at else None
        }
        
        if not detail:
            data.pop("content", None)
        
        return data
