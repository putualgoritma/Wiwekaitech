from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.auth import get_current_user, require_role
from app.services.tutorial_service import TutorialService
from app.schemas.admin_schemas import TutorialCreateUpdate
from app.models import User

router = APIRouter(prefix="/tutorials", tags=["admin-tutorials"])


@router.get("", dependencies=[Depends(require_role("admin", "editor", "viewer"))])
async def list_tutorials(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all tutorials for admin (including unpublished ones).
    Accessible to: admin, editor, viewer
    """
    tutorials = TutorialService.get_all_tutorials_admin(db)
    return {
        "success": True,
        "data": [TutorialService.format(t, db=db, lang="en", detail=False) for t in tutorials]
    }


@router.get("/{tutorial_id}", dependencies=[Depends(require_role("admin", "editor", "viewer"))])
async def get_tutorial(
    tutorial_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific tutorial by ID for admin.
    Accessible to: admin, editor, viewer
    """
    tutorial = TutorialService.get_tutorial_by_id(db, tutorial_id)
    if not tutorial:
        raise HTTPException(status_code=404, detail="Tutorial not found")
    
    return {
        "success": True,
        "data": TutorialService.format(tutorial, db=db, lang="en", detail=True)
    }


@router.post("", dependencies=[Depends(require_role("admin", "editor"))])
async def create_tutorial(
    payload: TutorialCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new tutorial.
    Accessible to: admin, editor
    """
    success, message, tutorial = TutorialService.create_tutorial(
        db,
        category_id=payload.category_id,
        title_en=payload.title_en,
        title_id=payload.title_id,
        slug=payload.slug,
        excerpt_en=payload.excerpt_en,
        excerpt_id=payload.excerpt_id,
        content_en=payload.content_en,
        content_id=payload.content_id,
        difficulty_level=payload.difficulty_level,
        reading_time=payload.reading_time,
        image_url=payload.image_url,
        tags=payload.tags,
        is_published=payload.is_published,
        published_at=payload.published_at,
    )
    
    if not success:
        raise HTTPException(status_code=400, detail=message)
    
    return {
        "success": True,
        "message": message,
        "data": TutorialService.format(tutorial, db=db, lang="en", detail=True)
    }


@router.put("/{tutorial_id}", dependencies=[Depends(require_role("admin", "editor"))])
async def update_tutorial(
    tutorial_id: int,
    payload: TutorialCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update an existing tutorial.
    Accessible to: admin, editor
    """
    success, message, tutorial = TutorialService.update_tutorial(
        db,
        tutorial_id,
        category_id=payload.category_id,
        title_en=payload.title_en,
        title_id=payload.title_id,
        slug=payload.slug,
        excerpt_en=payload.excerpt_en,
        excerpt_id=payload.excerpt_id,
        content_en=payload.content_en,
        content_id=payload.content_id,
        difficulty_level=payload.difficulty_level,
        reading_time=payload.reading_time,
        image_url=payload.image_url,
        tags=payload.tags,
        is_published=payload.is_published,
        published_at=payload.published_at,
    )
    
    if not success:
        raise HTTPException(status_code=400, detail=message)
    
    return {
        "success": True,
        "message": message,
        "data": TutorialService.format(tutorial, db=db, lang="en", detail=True)
    }


@router.delete("/{tutorial_id}", dependencies=[Depends(require_role("admin", "editor"))])
async def delete_tutorial(
    tutorial_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a tutorial.
    Accessible to: admin, editor
    """
    success, message = TutorialService.delete_tutorial(db, tutorial_id)
    
    if not success:
        raise HTTPException(status_code=404, detail=message)
    
    return {
        "success": True,
        "message": message
    }
