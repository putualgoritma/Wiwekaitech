from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import Tutorial
from typing import List, Optional, Tuple
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
    def get_tutorial_by_slug(db: Session, slug: str) -> Optional[Tutorial]:
        """Get tutorial by slug"""
        return db.query(Tutorial).filter(
            Tutorial.slug == slug,
            Tutorial.is_published == True
        ).first()
    
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
