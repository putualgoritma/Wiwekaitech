from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import BlogPost, Category
from typing import List, Optional


class BlogService:
    @staticmethod
    def get_blog_posts(
        db: Session,
        lang: str = "en",
        page: int = 1,
        page_size: int = 10,
        category_id: Optional[int] = None,
        tag: Optional[str] = None,
        author: Optional[str] = None
    ) -> tuple[List[BlogPost], int]:
        """Get published blog posts with filters and pagination"""
        query = db.query(BlogPost).filter(BlogPost.is_published == True)
        
        if category_id:
            query = query.filter(BlogPost.category_id == category_id)
        
        if author:
            query = query.filter(BlogPost.author_name == author)
        
        # Get total count
        total = query.count()
        
        # Apply pagination
        query = query.order_by(desc(BlogPost.published_at))
        query = query.offset((page - 1) * page_size).limit(page_size)
        
        posts = query.all()
        return posts, total
    
    @staticmethod
    def get_blog_post_by_slug(db: Session, slug: str) -> Optional[BlogPost]:
        """Get blog post by slug"""
        return db.query(BlogPost).filter(
            BlogPost.slug == slug,
            BlogPost.is_published == True
        ).first()
    
    @staticmethod
    def get_category(db: Session, category_id: int, lang: str = "en") -> Optional[dict]:
        """Get category by ID"""
        category = db.query(Category).filter(Category.id == category_id).first()
        if category:
            return {
                "id": category.id,
                "name": category.name_en if lang == "en" else category.name_id,
                "slug": category.slug
            }
        return None
    
    @staticmethod
    def get_categories(db: Session, lang: str = "en") -> List[dict]:
        """Get all blog categories"""
        categories = db.query(Category).filter(Category.type == "blog").all()
        return [
            {
                "id": cat.id,
                "name": cat.name_en if lang == "en" else cat.name_id,
                "slug": cat.slug
            }
            for cat in categories
        ]
    
    @staticmethod
    def format_blog_post(post: BlogPost, db: Session, lang: str = "en", detail: bool = False) -> dict:
        """Format blog post for response"""
        category = BlogService.get_category(db, post.category_id, lang)
        
        data = {
            "id": post.id,
            "category": category,
            "title": post.title_en if lang == "en" else post.title_id,
            "slug": post.slug,
            "excerpt": post.excerpt_en if lang == "en" else post.excerpt_id,
            "author_name": post.author_name,
            "reading_time": post.reading_time,
            "image_url": post.image_url,
            "tags": post.tags or [],
            "published_at": post.published_at.isoformat() if post.published_at else None
        }
        
        if detail:
            data["content"] = post.content_en if lang == "en" else post.content_id
        
        return data
