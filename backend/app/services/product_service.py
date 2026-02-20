from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import Product
from app.utils.formatters import BaseFormatter
from typing import List, Optional, Tuple


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
    def get_all_products_admin(db: Session) -> List[Product]:
        """Get all products for admin (including inactive)"""
        return db.query(Product).order_by(Product.display_order).all()

    @staticmethod
    def get_product_by_id(db: Session, product_id: int) -> Optional[Product]:
        """Get product by ID for admin"""
        return db.query(Product).filter(Product.id == product_id).first()

    @staticmethod
    def create_product(
        db: Session,
        title_en: str,
        title_id: str,
        slug: str,
        description_en: str,
        description_id: str,
        icon: Optional[str] = None,
        features_en: Optional[dict] = None,
        features_id: Optional[dict] = None,
        display_order: int = 0,
        is_active: bool = True,
    ) -> Tuple[bool, str, Optional[Product]]:
        """Create a new product"""
        # Check if slug already exists
        existing = db.query(Product).filter(Product.slug == slug).first()
        if existing:
            return False, "Slug already exists", None

        product = Product(
            title_en=title_en,
            title_id=title_id,
            slug=slug,
            description_en=description_en,
            description_id=description_id,
            icon=icon,
            features_en=features_en,
            features_id=features_id,
            display_order=display_order,
            is_active=is_active,
        )

        db.add(product)
        db.commit()
        db.refresh(product)
        
        return True, "Product created successfully", product

    @staticmethod
    def update_product(
        db: Session,
        product_id: int,
        title_en: Optional[str] = None,
        title_id: Optional[str] = None,
        slug: Optional[str] = None,
        description_en: Optional[str] = None,
        description_id: Optional[str] = None,
        icon: Optional[str] = None,
        features_en: Optional[dict] = None,
        features_id: Optional[dict] = None,
        display_order: Optional[int] = None,
        is_active: Optional[bool] = None,
    ) -> Tuple[bool, str, Optional[Product]]:
        """Update an existing product"""
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            return False, "Product not found", None

        # Check if new slug conflicts with existing slugs
        if slug and slug != product.slug:
            existing = db.query(Product).filter(Product.slug == slug).first()
            if existing:
                return False, "Slug already exists", None

        # Update fields
        if title_en is not None:
            product.title_en = title_en
        if title_id is not None:
            product.title_id = title_id
        if slug is not None:
            product.slug = slug
        if description_en is not None:
            product.description_en = description_en
        if description_id is not None:
            product.description_id = description_id
        if icon is not None:
            product.icon = icon
        if features_en is not None:
            product.features_en = features_en
        if features_id is not None:
            product.features_id = features_id
        if display_order is not None:
            product.display_order = display_order
        if is_active is not None:
            product.is_active = is_active

        db.commit()
        db.refresh(product)
        
        return True, "Product updated successfully", product

    @staticmethod
    def delete_product(db: Session, product_id: int) -> Tuple[bool, str]:
        """Delete a product"""
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            return False, "Product not found"

        db.delete(product)
        db.commit()
        
        return True, "Product deleted successfully"

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
            "product_url": product.product_url,
            "display_order": product.display_order
        }
