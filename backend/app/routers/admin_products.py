from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.auth import get_current_user, require_role
from app.services.product_service import ProductService
from app.schemas.admin_schemas import ProductCreateUpdate, ProductResponse, SuccessResponse
from app.models import User

router = APIRouter(prefix="/products", tags=["admin-products"])


@router.get("", dependencies=[Depends(require_role("admin", "editor", "viewer"))])
async def list_products(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all products for admin (including inactive ones).
    Accessible to: admin, editor, viewer
    """
    products = ProductService.get_all_products_admin(db)
    return {
        "success": True,
        "data": [ProductService.format(p, lang="en") for p in products]
    }


@router.get("/{product_id}", dependencies=[Depends(require_role("admin", "editor", "viewer"))])
async def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific product by ID for admin.
    Accessible to: admin, editor, viewer
    """
    product = ProductService.get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {
        "success": True,
        "data": ProductService.format(product, lang="en")
    }


@router.post("", dependencies=[Depends(require_role("admin", "editor"))])
async def create_product(
    payload: ProductCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new product.
    Accessible to: admin, editor
    """
    success, message, product = ProductService.create_product(
        db,
        title_en=payload.title_en,
        title_id=payload.title_id,
        slug=payload.slug,
        description_en=payload.description_en,
        description_id=payload.description_id,
        icon=payload.icon,
        features_en=payload.features_en,
        features_id=payload.features_id,
        display_order=payload.display_order,
        is_active=payload.is_active,
    )
    
    if not success:
        raise HTTPException(status_code=400, detail=message)
    
    return {
        "success": True,
        "message": message,
        "data": ProductService.format(product, lang="en")
    }


@router.put("/{product_id}", dependencies=[Depends(require_role("admin", "editor"))])
async def update_product(
    product_id: int,
    payload: ProductCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update an existing product.
    Accessible to: admin, editor
    """
    success, message, product = ProductService.update_product(
        db,
        product_id,
        title_en=payload.title_en,
        title_id=payload.title_id,
        slug=payload.slug,
        description_en=payload.description_en,
        description_id=payload.description_id,
        icon=payload.icon,
        features_en=payload.features_en,
        features_id=payload.features_id,
        display_order=payload.display_order,
        is_active=payload.is_active,
    )
    
    if not success:
        raise HTTPException(status_code=400, detail=message)
    
    return {
        "success": True,
        "message": message,
        "data": ProductService.format(product, lang="en")
    }


@router.delete("/{product_id}", dependencies=[Depends(require_role("admin", "editor"))])
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a product.
    Accessible to: admin, editor
    """
    success, message = ProductService.delete_product(db, product_id)
    
    if not success:
        raise HTTPException(status_code=404, detail=message)
    
    return {
        "success": True,
        "message": message
    }
