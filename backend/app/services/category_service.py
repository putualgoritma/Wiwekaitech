"""
Shared Category Service - eliminates duplicate category logic from blog and tutorial services.
Follows DRY principle with single source of truth for category operations.
"""

from sqlalchemy.orm import Session
from app.models import Category
from app.utils.formatters import BaseFormatter
from typing import List, Optional, Literal


class CategoryService:
    """Centralized service for category operations used by Blog and Tutorial features"""

    @staticmethod
    def get_category(
        db: Session,
        category_id: int,
        lang: str = "en"
    ) -> Optional[dict]:
        """
        Get a single category by ID.
        
        Args:
            db: Database session
            category_id: Category ID
            lang: Language ('en' or 'id')
            
        Returns:
            Formatted category dict or None if not found
        """
        category = db.query(Category).filter(Category.id == category_id).first()
        if not category:
            return None
        return CategoryService.format(category, lang)

    @staticmethod
    def get_categories_by_type(
        db: Session,
        category_type: Literal["blog", "tutorial"],
        lang: str = "en"
    ) -> List[dict]:
        """
        Get all categories of a specific type.
        
        Args:
            db: Database session
            category_type: Either 'blog' or 'tutorial'
            lang: Language ('en' or 'id')
            
        Returns:
            List of formatted category dicts
        """
        categories = (
            db.query(Category)
            .filter(Category.type == category_type)
            .all()
        )
        return [CategoryService.format(cat, lang) for cat in categories]

    @staticmethod
    def format(category: Category, lang: str = "en") -> dict:
        """
        Format category for API response.
        
        Args:
            category: Category model instance
            lang: Language code
            
        Returns:
            Formatted category dictionary
        """
        return {
            "id": category.id,
            "name": BaseFormatter.select_by_language(
                category.name_en,
                category.name_id,
                lang
            ),
            "slug": category.slug,
            "type": category.type
        }
