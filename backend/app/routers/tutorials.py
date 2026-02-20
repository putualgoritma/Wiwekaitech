from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.tutorial_service import TutorialService
from typing import Optional
import math

router = APIRouter(prefix="/tutorials", tags=["tutorials"])


@router.get("")
async def get_tutorials(
    lang: str = Query("en", regex="^(en|id)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    category_id: Optional[int] = None,
    difficulty: Optional[str] = Query(None, regex="^(beginner|intermediate|advanced)$"),
    tag: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get published tutorials with pagination and filters"""
    tutorials, total = TutorialService.get_tutorials(
        db, lang, page, page_size, category_id, difficulty, tag
    )
    
    total_pages = math.ceil(total / page_size)
    
    return {
        "success": True,
        "data": [TutorialService.format_tutorial(t, db, lang) for t in tutorials],
        "pagination": {
            "page": page,
            "page_size": page_size,
            "total_items": total,
            "total_pages": total_pages
        }
    }


@router.get("/categories")
async def get_tutorial_categories(
    lang: str = Query("en", regex="^(en|id)$"),
    db: Session = Depends(get_db)
):
    """Get all tutorial categories"""
    categories = TutorialService.get_categories(db, lang)
    
    return {
        "success": True,
        "data": categories
    }


@router.get("/{slug}")
async def get_tutorial(
    slug: str,
    lang: str = Query("en", regex="^(en|id)$"),
    db: Session = Depends(get_db)
):
    """Get tutorial detail by slug"""
    tutorial = TutorialService.get_tutorial_by_slug(db, slug)
    
    if not tutorial:
        raise HTTPException(
            status_code=404,
            detail={
                "success": False,
                "error": {
                    "code": "TUTORIAL_NOT_FOUND",
                    "message": "Tutorial not found"
                }
            }
        )
    
    return {
        "success": True,
        "data": TutorialService.format_tutorial(tutorial, db, lang, detail=True)
    }
