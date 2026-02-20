from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import Product
from app.utils.formatters import BaseFormatter
from typing import List, Optional


class ProductService:
    """Service for product operations with centralized formatting"""

    @staticmethod
    def get_all_products(db: Session, lang: str = "en", limit: int = 50) -> List[Product]:
        """Get all active products"""
        return (
            db.query(Product)
            .filter(Product.is_active == True)
            .order_by(Product.display_order)
            .limit(limit)
            .all()
        )

    @staticmethod
    def get_product_by_slug(db: Session, slug: str, lang: str = "en") -> Optional[Product]:
        """Get product by slug"""
        return (
            db.query(Product)
            .filter(Product.slug == slug, Product.is_active == True)
            .first()
        )

    @staticmethod
    def format(product: Product, lang: str = "en") -> dict:
        """Format product for API response using centralized formatter"""
        return {
            "id": product.id,
            **BaseFormatter.format_translations(
                product, ["title", "description", "features"], lang
            ),
            "slug": product.slug,
            "icon": product.icon,
            "display_order": product.display_order
        }
