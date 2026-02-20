from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.auth import get_current_user, require_role
from app.services.project_service import ProjectService
from app.schemas.admin_schemas import ProjectCreateUpdate
from app.models import User

router = APIRouter(prefix="/projects", tags=["admin-projects"])


@router.get("", dependencies=[Depends(require_role("admin", "editor", "viewer"))])
async def list_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all projects for admin (including inactive ones).
    Accessible to: admin, editor, viewer
    """
    projects = ProjectService.get_all_projects_admin(db)
    return {
        "success": True,
        "data": [ProjectService.format(p, lang="en") for p in projects]
    }


@router.get("/{project_id}", dependencies=[Depends(require_role("admin", "editor", "viewer"))])
async def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific project by ID for admin.
    Accessible to: admin, editor, viewer
    """
    project = ProjectService.get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return {
        "success": True,
        "data": ProjectService.format(project, lang="en", detail=True)
    }


@router.post("", dependencies=[Depends(require_role("admin", "editor"))])
async def create_project(
    payload: ProjectCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new project.
    Accessible to: admin, editor
    """
    success, message, project = ProjectService.create_project(
        db,
        title_en=payload.title_en,
        title_id=payload.title_id,
        slug=payload.slug,
        summary_en=payload.summary_en,
        summary_id=payload.summary_id,
        description_en=payload.description_en,
        description_id=payload.description_id,
        client_name=payload.client_name,
        industry=payload.industry,
        technologies=payload.technologies,
        image_url=payload.image_url,
        metrics_en=payload.metrics_en,
        metrics_id=payload.metrics_id,
        is_featured=payload.is_featured,
        is_active=payload.is_active,
        completed_date=payload.completed_date,
    )
    
    if not success:
        raise HTTPException(status_code=400, detail=message)
    
    return {
        "success": True,
        "message": message,
        "data": ProjectService.format(project, lang="en", detail=True)
    }


@router.put("/{project_id}", dependencies=[Depends(require_role("admin", "editor"))])
async def update_project(
    project_id: int,
    payload: ProjectCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update an existing project.
    Accessible to: admin, editor
    """
    success, message, project = ProjectService.update_project(
        db,
        project_id,
        title_en=payload.title_en,
        title_id=payload.title_id,
        slug=payload.slug,
        summary_en=payload.summary_en,
        summary_id=payload.summary_id,
        description_en=payload.description_en,
        description_id=payload.description_id,
        client_name=payload.client_name,
        industry=payload.industry,
        technologies=payload.technologies,
        image_url=payload.image_url,
        metrics_en=payload.metrics_en,
        metrics_id=payload.metrics_id,
        is_featured=payload.is_featured,
        is_active=payload.is_active,
        completed_date=payload.completed_date,
    )
    
    if not success:
        raise HTTPException(status_code=400, detail=message)
    
    return {
        "success": True,
        "message": message,
        "data": ProjectService.format(project, lang="en", detail=True)
    }


@router.delete("/{project_id}", dependencies=[Depends(require_role("admin", "editor"))])
async def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a project.
    Accessible to: admin, editor
    """
    success, message = ProjectService.delete_project(db, project_id)
    
    if not success:
        raise HTTPException(status_code=404, detail=message)
    
    return {
        "success": True,
        "message": message
    }
