from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import Project, Category
from typing import List, Optional, Tuple
from datetime import date
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
    def get_all_projects_admin(db: Session) -> List[Project]:
        """Get all projects for admin (including inactive)"""
        return db.query(Project).order_by(desc(Project.completed_date)).all()
    
    @staticmethod
    def get_project_by_id(db: Session, project_id: int) -> Optional[Project]:
        """Get project by ID for admin"""
        return db.query(Project).filter(Project.id == project_id).first()
    
    @staticmethod
    def get_project_by_slug(db: Session, slug: str, lang: str = "en") -> Optional[Project]:
        """Get project by slug"""
        return db.query(Project).filter(
            Project.slug == slug,
            Project.is_active == True
        ).first()
    
    @staticmethod
    def create_project(
        db: Session,
        title_en: str,
        title_id: str,
        slug: str,
        summary_en: str,
        summary_id: str,
        description_en: str,
        description_id: str,
        client_name: Optional[str] = None,
        industry: Optional[str] = None,
        technologies: Optional[list] = None,
        image_url: Optional[str] = None,
        metrics_en: Optional[dict] = None,
        metrics_id: Optional[dict] = None,
        is_featured: bool = False,
        is_active: bool = True,
        completed_date: Optional[date] = None,
    ) -> Tuple[bool, str, Optional[Project]]:
        """Create a new project"""
        # Check if slug already exists
        existing = db.query(Project).filter(Project.slug == slug).first()
        if existing:
            return False, "Slug already exists", None

        project = Project(
            title_en=title_en,
            title_id=title_id,
            slug=slug,
            summary_en=summary_en,
            summary_id=summary_id,
            description_en=description_en,
            description_id=description_id,
            client_name=client_name,
            industry=industry,
            technologies=technologies,
            image_url=image_url,
            metrics_en=metrics_en,
            metrics_id=metrics_id,
            is_featured=is_featured,
            is_active=is_active,
            completed_date=completed_date,
        )

        db.add(project)
        db.commit()
        db.refresh(project)
        
        return True, "Project created successfully", project
    
    @staticmethod
    def update_project(
        db: Session,
        project_id: int,
        title_en: Optional[str] = None,
        title_id: Optional[str] = None,
        slug: Optional[str] = None,
        summary_en: Optional[str] = None,
        summary_id: Optional[str] = None,
        description_en: Optional[str] = None,
        description_id: Optional[str] = None,
        client_name: Optional[str] = None,
        industry: Optional[str] = None,
        technologies: Optional[list] = None,
        image_url: Optional[str] = None,
        metrics_en: Optional[dict] = None,
        metrics_id: Optional[dict] = None,
        is_featured: Optional[bool] = None,
        is_active: Optional[bool] = None,
        completed_date: Optional[date] = None,
    ) -> Tuple[bool, str, Optional[Project]]:
        """Update an existing project"""
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return False, "Project not found", None

        # Check if new slug conflicts with existing slugs
        if slug and slug != project.slug:
            existing = db.query(Project).filter(Project.slug == slug).first()
            if existing:
                return False, "Slug already exists", None

        # Update fields
        if title_en is not None:
            project.title_en = title_en
        if title_id is not None:
            project.title_id = title_id
        if slug is not None:
            project.slug = slug
        if summary_en is not None:
            project.summary_en = summary_en
        if summary_id is not None:
            project.summary_id = summary_id
        if description_en is not None:
            project.description_en = description_en
        if description_id is not None:
            project.description_id = description_id
        if client_name is not None:
            project.client_name = client_name
        if industry is not None:
            project.industry = industry
        if technologies is not None:
            project.technologies = technologies
        if image_url is not None:
            project.image_url = image_url
        if metrics_en is not None:
            project.metrics_en = metrics_en
        if metrics_id is not None:
            project.metrics_id = metrics_id
        if is_featured is not None:
            project.is_featured = is_featured
        if is_active is not None:
            project.is_active = is_active
        if completed_date is not None:
            project.completed_date = completed_date

        db.commit()
        db.refresh(project)
        
        return True, "Project updated successfully", project
    
    @staticmethod
    def delete_project(db: Session, project_id: int) -> Tuple[bool, str]:
        """Delete a project"""
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return False, "Project not found"

        db.delete(project)
        db.commit()
        
        return True, "Project deleted successfully"
    
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
