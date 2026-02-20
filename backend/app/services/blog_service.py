from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import BlogPost
from typing import List, Optional, Tuple
from datetime import datetime
from app.utils.formatters import BaseFormatter
from app.utils.pagination import PaginationParams, paginate, build_paginated_response


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
    def get_all_blog_posts_admin(db: Session) -> List[BlogPost]:
        """Get all blog posts for admin (including unpublished)"""
        return db.query(BlogPost).order_by(desc(BlogPost.published_at)).all()
    
    @staticmethod
    def get_blog_post_by_id(db: Session, post_id: int) -> Optional[BlogPost]:
        """Get blog post by ID for admin"""
        return db.query(BlogPost).filter(BlogPost.id == post_id).first()
    
    @staticmethod
    def get_blog_post_by_slug(db: Session, slug: str) -> Optional[BlogPost]:
        """Get blog post by slug"""
        return db.query(BlogPost).filter(
            BlogPost.slug == slug,
            BlogPost.is_published == True
        ).first()
    
    @staticmethod
    def create_blog_post(
        db: Session,
        category_id: int,
        title_en: str,
        title_id: str,
        slug: str,
        excerpt_en: str,
        excerpt_id: str,
        content_en: str,
        content_id: str,
        author_name: Optional[str] = None,
        reading_time: Optional[int] = None,
        image_url: Optional[str] = None,
        tags: Optional[list] = None,
        is_published: bool = False,
        published_at: Optional[datetime] = None,
    ) -> Tuple[bool, str, Optional[BlogPost]]:
        """Create a new blog post"""
        # Check if slug already exists
        existing = db.query(BlogPost).filter(BlogPost.slug == slug).first()
        if existing:
            return False, "Slug already exists", None

        post = BlogPost(
            category_id=category_id,
            title_en=title_en,
            title_id=title_id,
            slug=slug,
            excerpt_en=excerpt_en,
            excerpt_id=excerpt_id,
            content_en=content_en,
            content_id=content_id,
            author_name=author_name,
            reading_time=reading_time,
            image_url=image_url,
            tags=tags,
            is_published=is_published,
            published_at=published_at,
        )

        db.add(post)
        db.commit()
        db.refresh(post)
        
        return True, "Blog post created successfully", post
    
    @staticmethod
    def update_blog_post(
        db: Session,
        post_id: int,
        category_id: Optional[int] = None,
        title_en: Optional[str] = None,
        title_id: Optional[str] = None,
        slug: Optional[str] = None,
        excerpt_en: Optional[str] = None,
        excerpt_id: Optional[str] = None,
        content_en: Optional[str] = None,
        content_id: Optional[str] = None,
        author_name: Optional[str] = None,
        reading_time: Optional[int] = None,
        image_url: Optional[str] = None,
        tags: Optional[list] = None,
        is_published: Optional[bool] = None,
        published_at: Optional[datetime] = None,
    ) -> Tuple[bool, str, Optional[BlogPost]]:
        """Update an existing blog post"""
        post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
        if not post:
            return False, "Blog post not found", None

        # Check if new slug conflicts with existing slugs
        if slug and slug != post.slug:
            existing = db.query(BlogPost).filter(BlogPost.slug == slug).first()
            if existing:
                return False, "Slug already exists", None

        # Update fields
        if category_id is not None:
            post.category_id = category_id
        if title_en is not None:
            post.title_en = title_en
        if title_id is not None:
            post.title_id = title_id
        if slug is not None:
            post.slug = slug
        if excerpt_en is not None:
            post.excerpt_en = excerpt_en
        if excerpt_id is not None:
            post.excerpt_id = excerpt_id
        if content_en is not None:
            post.content_en = content_en
        if content_id is not None:
            post.content_id = content_id
        if author_name is not None:
            post.author_name = author_name
        if reading_time is not None:
            post.reading_time = reading_time
        if image_url is not None:
            post.image_url = image_url
        if tags is not None:
            post.tags = tags
        if is_published is not None:
            post.is_published = is_published
        if published_at is not None:
            post.published_at = published_at

        db.commit()
        db.refresh(post)
        
        return True, "Blog post updated successfully", post
    
    @staticmethod
    def delete_blog_post(db: Session, post_id: int) -> Tuple[bool, str]:
        """Delete a blog post"""
        post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
        if not post:
            return False, "Blog post not found"

        db.delete(post)
        db.commit()
        
        return True, "Blog post deleted successfully"
    
    @staticmethod
    def format(post: BlogPost, db: Session = None, lang: str = "en", detail: bool = False) -> dict:
        """Format blog post for response using centralized formatter"""
        # TODO: Add category support later
        # category = CategoryService.get_category(db, post.category_id, lang) if post.category_id else None
        
        data = {
            "id": post.id,
            "category": None,
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
