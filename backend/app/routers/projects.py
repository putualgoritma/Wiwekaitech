from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.project_service import ProjectService
from app.utils.pagination import PaginationParams, build_paginated_response
from typing import Optional

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("")
async def get_projects(
    lang: str = Query("en", regex="^(en|id)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    featured: Optional[bool] = None,
    industry: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get projects with pagination and filters"""
    params = PaginationParams(page=page, page_size=page_size)
    projects, total = ProjectService.get_projects(
        db, lang, params, featured, industry
    )
    
    return {
        "success": True,
        **build_paginated_response(
            [ProjectService.format(p, lang) for p in projects],
            total,
            params
        )
    }


@router.get("/{slug}")
async def get_project(
    slug: str,
    lang: str = Query("en", regex="^(en|id)$"),
    db: Session = Depends(get_db)
):
    """Get project detail by slug"""
    project = ProjectService.get_project_by_slug(db, slug, lang)
    
    if not project:
        raise HTTPException(
            status_code=404,
            detail={
                "success": False,
                "error": {
                    "code": "PROJECT_NOT_FOUND",
                    "message": "Project not found"
                }
            }
        )
    
    return {
        "success": True,
        "data": ProjectService.format(project, lang, detail=True)
    }
