from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import Tutorial
from typing import List, Optional, Tuple
from datetime import datetime
from app.utils.formatters import BaseFormatter
from app.utils.pagination import PaginationParams, paginate, build_paginated_response


class TutorialService:
    @staticmethod
    def get_tutorials(
        db: Session,
        lang: str = "en",
        params: Optional[PaginationParams] = None,
        category_id: Optional[int] = None,
        difficulty: Optional[str] = None,
        tag: Optional[str] = None
    ) -> Tuple[List[Tutorial], int]:
        """Get published tutorials with filters and pagination"""
        if params is None:
            params = PaginationParams()
        
        query = db.query(Tutorial).filter(Tutorial.is_published == True)
        
        if category_id:
            query = query.filter(Tutorial.category_id == category_id)
        
        if difficulty:
            query = query.filter(Tutorial.difficulty_level == difficulty)
        
        # Apply pagination
        items, total = paginate(
            query.order_by(desc(Tutorial.published_at)),
            params
        )
        
        return items, total
    
    @staticmethod
    def get_all_tutorials_admin(db: Session) -> List[Tutorial]:
        """Get all tutorials for admin (including unpublished)"""
        return db.query(Tutorial).order_by(desc(Tutorial.published_at)).all()
    
    @staticmethod
    def get_tutorial_by_id(db: Session, tutorial_id: int) -> Optional[Tutorial]:
        """Get tutorial by ID for admin"""
        return db.query(Tutorial).filter(Tutorial.id == tutorial_id).first()
    
    @staticmethod
    def get_tutorial_by_slug(db: Session, slug: str) -> Optional[Tutorial]:
        """Get tutorial by slug"""
        return db.query(Tutorial).filter(
            Tutorial.slug == slug,
            Tutorial.is_published == True
        ).first()
    
    @staticmethod
    def create_tutorial(
        db: Session,
        category_id: int,
        title_en: str,
        title_id: str,
        slug: str,
        excerpt_en: str,
        excerpt_id: str,
        content_en: str,
        content_id: str,
        difficulty_level: str = "beginner",
        reading_time: Optional[int] = None,
        image_url: Optional[str] = None,
        tags: Optional[list] = None,
        is_published: bool = False,
        published_at: Optional[datetime] = None,
    ) -> Tuple[bool, str, Optional[Tutorial]]:
        """Create a new tutorial"""
        # Check if slug already exists
        existing = db.query(Tutorial).filter(Tutorial.slug == slug).first()
        if existing:
            return False, "Slug already exists", None

        tutorial = Tutorial(
            category_id=category_id,
            title_en=title_en,
            title_id=title_id,
            slug=slug,
            excerpt_en=excerpt_en,
            excerpt_id=excerpt_id,
            content_en=content_en,
            content_id=content_id,
            difficulty_level=difficulty_level,
            reading_time=reading_time,
            image_url=image_url,
            tags=tags,
            is_published=is_published,
            published_at=published_at,
        )

        db.add(tutorial)
        db.commit()
        db.refresh(tutorial)
        
        return True, "Tutorial created successfully", tutorial
    
    @staticmethod
    def update_tutorial(
        db: Session,
        tutorial_id: int,
        category_id: Optional[int] = None,
        title_en: Optional[str] = None,
        title_id: Optional[str] = None,
        slug: Optional[str] = None,
        excerpt_en: Optional[str] = None,
        excerpt_id: Optional[str] = None,
        content_en: Optional[str] = None,
        content_id: Optional[str] = None,
        difficulty_level: Optional[str] = None,
        reading_time: Optional[int] = None,
        image_url: Optional[str] = None,
        tags: Optional[list] = None,
        is_published: Optional[bool] = None,
        published_at: Optional[datetime] = None,
    ) -> Tuple[bool, str, Optional[Tutorial]]:
        """Update an existing tutorial"""
        tutorial = db.query(Tutorial).filter(Tutorial.id == tutorial_id).first()
        if not tutorial:
            return False, "Tutorial not found", None

        # Check if new slug conflicts with existing slugs
        if slug and slug != tutorial.slug:
            existing = db.query(Tutorial).filter(Tutorial.slug == slug).first()
            if existing:
                return False, "Slug already exists", None

        # Update fields
        if category_id is not None:
            tutorial.category_id = category_id
        if title_en is not None:
            tutorial.title_en = title_en
        if title_id is not None:
            tutorial.title_id = title_id
        if slug is not None:
            tutorial.slug = slug
        if excerpt_en is not None:
            tutorial.excerpt_en = excerpt_en
        if excerpt_id is not None:
            tutorial.excerpt_id = excerpt_id
        if content_en is not None:
            tutorial.content_en = content_en
        if content_id is not None:
            tutorial.content_id = content_id
        if difficulty_level is not None:
            tutorial.difficulty_level = difficulty_level
        if reading_time is not None:
            tutorial.reading_time = reading_time
        if image_url is not None:
            tutorial.image_url = image_url
        if tags is not None:
            tutorial.tags = tags
        if is_published is not None:
            tutorial.is_published = is_published
        if published_at is not None:
            tutorial.published_at = published_at

        db.commit()
        db.refresh(tutorial)
        
        return True, "Tutorial updated successfully", tutorial
    
    @staticmethod
    def delete_tutorial(db: Session, tutorial_id: int) -> Tuple[bool, str]:
        """Delete a tutorial"""
        tutorial = db.query(Tutorial).filter(Tutorial.id == tutorial_id).first()
        if not tutorial:
            return False, "Tutorial not found"

        db.delete(tutorial)
        db.commit()
        
        return True, "Tutorial deleted successfully"
    
    @staticmethod
    def format(tutorial: Tutorial, db: Session = None, lang: str = "en", detail: bool = False) -> dict:
        """Format tutorial for response using centralized formatter"""
        # TODO: Add category support later
        # category = CategoryService.get_category(db, tutorial.category_id, lang) if tutorial.category_id else None
        
        data = {
            "id": tutorial.id,
            "category": None,
            **BaseFormatter.format_translations(
                tutorial, ["title", "excerpt", "content"], lang
            ),
            "slug": tutorial.slug,
            "difficulty": tutorial.difficulty_level,
            "reading_time": tutorial.reading_time,
            "image_url": tutorial.image_url,
            "tags": tutorial.tags or [],
            "published_at": tutorial.published_at.isoformat() if tutorial.published_at else None
        }
        
        if not detail:
            data.pop("content", None)
        
        return data
