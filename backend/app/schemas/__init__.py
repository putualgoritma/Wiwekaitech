from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, date
from enum import Enum


class DifficultyLevel(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"


class PreferredContact(str, Enum):
    email = "email"
    phone = "phone"
    whatsapp = "whatsapp"


class MessageStatus(str, Enum):
    new = "new"
    read = "read"
    replied = "replied"
    archived = "archived"


# Category Schemas
class CategoryBase(BaseModel):
    name: str
    slug: str


class CategoryResponse(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True


# Product Schemas
class ProductResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    icon: Optional[str] = None
    features: List[str] = []
    display_order: int
    
    class Config:
        from_attributes = True


# Project Schemas
class ProjectListResponse(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    client_name: Optional[str] = None
    industry: Optional[str] = None
    technologies: List[str] = []
    image_url: Optional[str] = None
    metrics: List[str] = []
    is_featured: bool
    completed_date: Optional[date] = None
    
    class Config:
        from_attributes = True


class ProjectDetailResponse(ProjectListResponse):
    description: str


# Tutorial Schemas
class TutorialListResponse(BaseModel):
    id: int
    category: CategoryResponse
    title: str
    slug: str
    excerpt: str
    difficulty_level: DifficultyLevel
    reading_time: Optional[int] = None
    image_url: Optional[str] = None
    tags: List[str] = []
    published_at: datetime
    
    class Config:
        from_attributes = True


class TutorialDetailResponse(TutorialListResponse):
    content: str


# Blog Schemas
class BlogListResponse(BaseModel):
    id: int
    category: CategoryResponse
    title: str
    slug: str
    excerpt: str
    author_name: Optional[str] = None
    reading_time: Optional[int] = None
    image_url: Optional[str] = None
    tags: List[str] = []
    published_at: datetime
    
    class Config:
        from_attributes = True


class BlogDetailResponse(BlogListResponse):
    content: str


# Contact Schemas
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=50)
    company: Optional[str] = Field(None, max_length=200)
    subject: str = Field(..., min_length=5, max_length=300)
    message: str = Field(..., min_length=20, max_length=5000)
    preferred_contact: Optional[PreferredContact] = PreferredContact.email


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    created_at: datetime
    
    class Config:
        from_attributes = True


# Pagination
class PaginationMeta(BaseModel):
    page: int
    page_size: int
    total_items: int
    total_pages: int


# Generic Response
class ApiResponse(BaseModel):
    success: bool
    data: Optional[dict] = None
    message: Optional[str] = None


class PaginatedResponse(BaseModel):
    success: bool
    data: List[dict]
    pagination: PaginationMeta
