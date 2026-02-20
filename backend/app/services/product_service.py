from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import Product
from typing import List, Optional
import math


class ProductService:
    @staticmethod
    def get_all_products(db: Session, lang: str = "en", limit: int = 50) -> List[Product]:
        """Get all active products"""
        return db.query(Product).filter(
            Product.is_active == True
        ).order_by(Product.display_order).limit(limit).all()
    
    @staticmethod
    def get_product_by_slug(db: Session, slug: str, lang: str = "en") -> Optional[Product]:
        """Get product by slug"""
        return db.query(Product).filter(
            Product.slug == slug,
            Product.is_active == True
        ).first()
    
    @staticmethod
    def format_product(product: Product, lang: str) -> dict:
        """Format product for response"""
        return {
            "id": product.id,
            "title": product.title_en if lang == "en" else product.title_id,
            "slug": product.slug,
            "description": product.description_en if lang == "en" else product.description_id,
            "icon": product.icon,
            "features": product.features_en if lang == "en" else product.features_id,
            "display_order": product.display_order
        }
