from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Date, Enum, JSON
from sqlalchemy.sql import func
from app.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name_en = Column(String(100), nullable=False)
    name_id = Column(String(100), nullable=False)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    type = Column(Enum('tutorial', 'blog'), nullable=False, index=True)
    created_at = Column(DateTime, server_default=func.now())


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title_en = Column(String(200), nullable=False)
    title_id = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False, index=True)
    description_en = Column(Text, nullable=False)
    description_id = Column(Text, nullable=False)
    icon = Column(String(100), nullable=True)
    features_en = Column(JSON, nullable=True)
    features_id = Column(JSON, nullable=True)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title_en = Column(String(200), nullable=False)
    title_id = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False, index=True)
    summary_en = Column(Text, nullable=False)
    summary_id = Column(Text, nullable=False)
    description_en = Column(Text, nullable=False)
    description_id = Column(Text, nullable=False)
    client_name = Column(String(200), nullable=True)
    industry = Column(String(100), nullable=True, index=True)
    technologies = Column(JSON, nullable=True)
    image_url = Column(String(500), nullable=True)
    metrics_en = Column(JSON, nullable=True)
    metrics_id = Column(JSON, nullable=True)
    is_featured = Column(Boolean, default=False, index=True)
    is_active = Column(Boolean, default=True, index=True)
    completed_date = Column(Date, nullable=True, index=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class Tutorial(Base):
    __tablename__ = "tutorials"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, nullable=False, index=True)
    title_en = Column(String(300), nullable=False)
    title_id = Column(String(300), nullable=False)
    slug = Column(String(300), unique=True, nullable=False, index=True)
    excerpt_en = Column(Text, nullable=False)
    excerpt_id = Column(Text, nullable=False)
    content_en = Column(Text, nullable=False)
    content_id = Column(Text, nullable=False)
    difficulty_level = Column(Enum('beginner', 'intermediate', 'advanced'), nullable=False, index=True)
    reading_time = Column(Integer, nullable=True)
    image_url = Column(String(500), nullable=True)
    tags = Column(JSON, nullable=True)
    is_published = Column(Boolean, default=False, index=True)
    published_at = Column(DateTime, nullable=True, index=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, nullable=False, index=True)
    title_en = Column(String(300), nullable=False)
    title_id = Column(String(300), nullable=False)
    slug = Column(String(300), unique=True, nullable=False, index=True)
    excerpt_en = Column(Text, nullable=False)
    excerpt_id = Column(Text, nullable=False)
    content_en = Column(Text, nullable=False)
    content_id = Column(Text, nullable=False)
    author_name = Column(String(100), nullable=True, index=True)
    reading_time = Column(Integer, nullable=True)
    image_url = Column(String(500), nullable=True)
    tags = Column(JSON, nullable=True)
    is_published = Column(Boolean, default=False, index=True)
    published_at = Column(DateTime, nullable=True, index=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    company = Column(String(200), nullable=True)
    subject = Column(String(300), nullable=False)
    message = Column(Text, nullable=False)
    preferred_contact = Column(Enum('email', 'phone', 'whatsapp'), default='email')
    status = Column(Enum('new', 'read', 'replied', 'archived'), default='new', index=True)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(500), nullable=True)
    created_at = Column(DateTime, server_default=func.now(), index=True)
