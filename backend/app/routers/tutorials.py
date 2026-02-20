from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.tutorial_service import TutorialService
from app.utils.pagination import PaginationParams, build_paginated_response
from typing import Optional

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
    params = PaginationParams(page=page, page_size=page_size)
    tutorials, total = TutorialService.get_tutorials(
        db, lang, params, category_id, difficulty, tag
    )
    
    return {
        "success": True,
        **build_paginated_response(
            [TutorialService.format(t, lang=lang) for t in tutorials],
            total,
            params
        )
    }


# TODO: Re-enable when categories are fully integrated
# @router.get("/categories")
# async def get_tutorial_categories(
#     lang: str = Query("en", regex="^(en|id)$"),
#     db: Session = Depends(get_db)
# ):
#     """Get all tutorial categories"""
#     categories = CategoryService.get_categories_by_type(db, "tutorial", lang)
#     
#     return {
#         "success": True,
#         "data": categories
#     }


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
        "data": TutorialService.format(tutorial, lang=lang, detail=True)
    }
