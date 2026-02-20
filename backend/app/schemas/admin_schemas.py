from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date


# Product Schemas
class ProductCreateUpdate(BaseModel):
    title_en: str = Field(..., min_length=1, max_length=200)
    title_id: str = Field(..., min_length=1, max_length=200)
    slug: str = Field(..., min_length=1, max_length=200)
    description_en: str = Field(..., min_length=1)
    description_id: str = Field(..., min_length=1)
    icon: Optional[str] = Field(None, max_length=100)
    features_en: Optional[List[str]] = None
    features_id: Optional[List[str]] = None
    display_order: int = Field(0, ge=0)
    is_active: bool = Field(True)


class ProductResponse(ProductCreateUpdate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Project Schemas
class ProjectCreateUpdate(BaseModel):
    title_en: str = Field(..., min_length=1, max_length=200)
    title_id: str = Field(..., min_length=1, max_length=200)
    slug: str = Field(..., min_length=1, max_length=200)
    summary_en: str = Field(..., min_length=1)
    summary_id: str = Field(..., min_length=1)
    description_en: str = Field(..., min_length=1)
    description_id: str = Field(..., min_length=1)
    client_name: Optional[str] = Field(None, max_length=200)
    industry: Optional[str] = Field(None, max_length=100)
    technologies: Optional[List[str]] = None
    image_url: Optional[str] = Field(None, max_length=500)
    metrics_en: Optional[dict] = None
    metrics_id: Optional[dict] = None
    is_featured: bool = Field(False)
    is_active: bool = Field(True)
    completed_date: Optional[date] = None


class ProjectResponse(ProjectCreateUpdate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Tutorial Schemas
class TutorialCreateUpdate(BaseModel):
    category_id: int = Field(..., gt=0)
    title_en: str = Field(..., min_length=1, max_length=300)
    title_id: str = Field(..., min_length=1, max_length=300)
    slug: str = Field(..., min_length=1, max_length=300)
    excerpt_en: str = Field(..., min_length=1)
    excerpt_id: str = Field(..., min_length=1)
    content_en: str = Field(..., min_length=1)
    content_id: str = Field(..., min_length=1)
    difficulty_level: str = Field("beginner")  # beginner, intermediate, advanced
    reading_time: Optional[int] = Field(None, ge=0)
    image_url: Optional[str] = Field(None, max_length=500)
    tags: Optional[List[str]] = None
    is_published: bool = Field(False)
    published_at: Optional[datetime] = None


class TutorialResponse(TutorialCreateUpdate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# BlogPost Schemas
class BlogPostCreateUpdate(BaseModel):
    category_id: int = Field(..., gt=0)
    title_en: str = Field(..., min_length=1, max_length=300)
    title_id: str = Field(..., min_length=1, max_length=300)
    slug: str = Field(..., min_length=1, max_length=300)
    excerpt_en: str = Field(..., min_length=1)
    excerpt_id: str = Field(..., min_length=1)
    content_en: str = Field(..., min_length=1)
    content_id: str = Field(..., min_length=1)
    author_name: Optional[str] = Field(None, max_length=100)
    reading_time: Optional[int] = Field(None, ge=0)
    image_url: Optional[str] = Field(None, max_length=500)
    tags: Optional[List[str]] = None
    is_published: bool = Field(False)
    published_at: Optional[datetime] = None


class BlogPostResponse(BlogPostCreateUpdate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# User Schemas
class UserCreateUpdate(BaseModel):
    username: str = Field(..., min_length=3, max_length=100)
    email: str = Field(..., max_length=200)
    password: Optional[str] = Field(None, min_length=6, max_length=100)
    role: str = Field("viewer")  # admin, editor, viewer
    is_active: bool = Field(True)


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Generic Response Schemas
class SuccessResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None


class ErrorResponse(BaseModel):
    success: bool = False
    error: dict
