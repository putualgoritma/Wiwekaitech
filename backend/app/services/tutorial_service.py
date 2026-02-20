from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import Tutorial, Category
from typing import List, Optional


class TutorialService:
    @staticmethod
    def get_tutorials(
        db: Session,
        lang: str = "en",
        page: int = 1,
        page_size: int = 10,
        category_id: Optional[int] = None,
        difficulty: Optional[str] = None,
        tag: Optional[str] = None
    ) -> tuple[List[Tutorial], int]:
        """Get published tutorials with filters and pagination"""
        query = db.query(Tutorial).filter(Tutorial.is_published == True)
        
        if category_id:
            query = query.filter(Tutorial.category_id == category_id)
        
        if difficulty:
            query = query.filter(Tutorial.difficulty_level == difficulty)
        
        # Get total count
        total = query.count()
        
        # Apply pagination
        query = query.order_by(desc(Tutorial.published_at))
        query = query.offset((page - 1) * page_size).limit(page_size)
        
        tutorials = query.all()
        return tutorials, total
    
    @staticmethod
    def get_tutorial_by_slug(db: Session, slug: str) -> Optional[Tutorial]:
        """Get tutorial by slug"""
        return db.query(Tutorial).filter(
            Tutorial.slug == slug,
            Tutorial.is_published == True
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
        """Get all tutorial categories"""
        categories = db.query(Category).filter(Category.type == "tutorial").all()
        return [
            {
                "id": cat.id,
                "name": cat.name_en if lang == "en" else cat.name_id,
                "slug": cat.slug
            }
            for cat in categories
        ]
    
    @staticmethod
    def format_tutorial(tutorial: Tutorial, db: Session, lang: str = "en", detail: bool = False) -> dict:
        """Format tutorial for response"""
        category = TutorialService.get_category(db, tutorial.category_id, lang)
        
        data = {
            "id": tutorial.id,
            "category": category,
            "title": tutorial.title_en if lang == "en" else tutorial.title_id,
            "slug": tutorial.slug,
            "excerpt": tutorial.excerpt_en if lang == "en" else tutorial.excerpt_id,
            "difficulty_level": tutorial.difficulty_level,
            "reading_time": tutorial.reading_time,
            "image_url": tutorial.image_url,
            "tags": tutorial.tags or [],
            "published_at": tutorial.published_at.isoformat() if tutorial.published_at else None
        }
        
        if detail:
            data["content"] = tutorial.content_en if lang == "en" else tutorial.content_id
        
        return data
