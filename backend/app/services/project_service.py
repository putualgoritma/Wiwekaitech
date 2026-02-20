from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import Project, Category
from typing import List, Optional
import math


class ProjectService:
    @staticmethod
    def get_projects(
        db: Session, 
        lang: str = "en",
        page: int = 1,
        page_size: int = 10,
        featured: Optional[bool] = None,
        industry: Optional[str] = None
    ) -> tuple[List[Project], int]:
        """Get projects with filters and pagination"""
        query = db.query(Project).filter(Project.is_active == True)
        
        if featured is not None:
            query = query.filter(Project.is_featured == featured)
        
        if industry:
            query = query.filter(Project.industry == industry)
        
        # Get total count
        total = query.count()
        
        # Apply pagination
        query = query.order_by(desc(Project.completed_date))
        query = query.offset((page - 1) * page_size).limit(page_size)
        
        projects = query.all()
        return projects, total
    
    @staticmethod
    def get_project_by_slug(db: Session, slug: str, lang: str = "en") -> Optional[Project]:
        """Get project by slug"""
        return db.query(Project).filter(
            Project.slug == slug,
            Project.is_active == True
        ).first()
    
    @staticmethod
    def format_project(project: Project, lang: str, detail: bool = False) -> dict:
        """Format project for response"""
        data = {
            "id": project.id,
            "title": project.title_en if lang == "en" else project.title_id,
            "slug": project.slug,
            "summary": project.summary_en if lang == "en" else project.summary_id,
            "client_name": project.client_name,
            "industry": project.industry,
            "technologies": project.technologies or [],
            "image_url": project.image_url,
            "metrics": project.metrics_en if lang == "en" else project.metrics_id or [],
            "is_featured": project.is_featured,
            "completed_date": project.completed_date.isoformat() if project.completed_date else None
        }
        
        if detail:
            data["description"] = project.description_en if lang == "en" else project.description_id
        
        return data
