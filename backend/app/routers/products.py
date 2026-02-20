from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.product_service import ProductService
from typing import Optional

router = APIRouter(prefix="/products", tags=["products"])


@router.get("")
async def get_products(
    lang: str = Query("en", regex="^(en|id)$"),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get all active products"""
    products = ProductService.get_all_products(db, lang, limit)
    
    return {
        "success": True,
        "data": [ProductService.format_product(p, lang) for p in products]
    }


@router.get("/{slug}")
async def get_product(
    slug: str,
    lang: str = Query("en", regex="^(en|id)$"),
    db: Session = Depends(get_db)
):
    """Get product by slug"""
    product = ProductService.get_product_by_slug(db, slug, lang)
    
    if not product:
        raise HTTPException(
            status_code=404,
            detail={
                "success": False,
                "error": {
                    "code": "PRODUCT_NOT_FOUND",
                    "message": "Product not found"
                }
            }
        )
    
    return {
        "success": True,
        "data": ProductService.format_product(product, lang)
    }
