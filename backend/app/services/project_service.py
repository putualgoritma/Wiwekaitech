from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import Project, Category
from typing import List, Optional, Tuple
from app.utils.formatters import BaseFormatter
from app.utils.pagination import PaginationParams, paginate, build_paginated_response


class ProjectService:
    @staticmethod
    def get_projects(
        db: Session, 
        lang: str = "en",
        params: Optional[PaginationParams] = None,
        featured: Optional[bool] = None,
        industry: Optional[str] = None
    ) -> Tuple[List[Project], int]:
        """Get projects with filters and pagination"""
        if params is None:
            params = PaginationParams()
        
        query = db.query(Project).filter(Project.is_active == True)
        
        if featured is not None:
            query = query.filter(Project.is_featured == featured)
        
        if industry:
            query = query.filter(Project.industry == industry)
        
        # Apply pagination with count
        items, total = paginate(
            query.order_by(desc(Project.completed_date)),
            params
        )
        
        return items, total
    
    @staticmethod
    def get_project_by_slug(db: Session, slug: str, lang: str = "en") -> Optional[Project]:
        """Get project by slug"""
        return db.query(Project).filter(
            Project.slug == slug,
            Project.is_active == True
        ).first()
    
    @staticmethod
    def format(project: Project, lang: str = "en", detail: bool = False) -> dict:
        """Format project for response using centralized formatter"""
        data = {
            "id": project.id,
            "slug": project.slug,
            **BaseFormatter.format_translations(
                project, ["title", "summary", "description", "metrics"], lang
            ),
            "client_name": project.client_name,
            "industry": project.industry,
            "technologies": project.technologies or [],
            "image_url": project.image_url,
            "is_featured": project.is_featured,
            "completed_date": project.completed_date.isoformat() if project.completed_date else None
        }
        
        if not detail:
            data.pop("description", None)
        
        return data
