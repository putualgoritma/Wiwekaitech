from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.auth import get_current_user, require_role
from app.services.blog_service import BlogService
from app.schemas.admin_schemas import BlogPostCreateUpdate
from app.models import User

router = APIRouter(prefix="/blog", tags=["admin-blog"])


@router.get("", dependencies=[Depends(require_role("admin", "editor", "viewer"))])
async def list_blog_posts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all blog posts for admin (including unpublished ones).
    Accessible to: admin, editor, viewer
    """
    posts = BlogService.get_all_blog_posts_admin(db)
    return {
        "success": True,
        "data": [BlogService.format(p, db=db, lang="en", detail=False) for p in posts]
    }


@router.get("/{post_id}", dependencies=[Depends(require_role("admin", "editor", "viewer"))])
async def get_blog_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific blog post by ID for admin.
    Accessible to: admin, editor, viewer
    """
    post = BlogService.get_blog_post_by_id(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    return {
        "success": True,
        "data": BlogService.format(post, db=db, lang="en", detail=True)
    }


@router.post("", dependencies=[Depends(require_role("admin", "editor"))])
async def create_blog_post(
    payload: BlogPostCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new blog post.
    Accessible to: admin, editor
    """
    success, message, post = BlogService.create_blog_post(
        db,
        category_id=payload.category_id,
        title_en=payload.title_en,
        title_id=payload.title_id,
        slug=payload.slug,
        excerpt_en=payload.excerpt_en,
        excerpt_id=payload.excerpt_id,
        content_en=payload.content_en,
        content_id=payload.content_id,
        author_name=payload.author_name,
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
        "data": BlogService.format(post, db=db, lang="en", detail=True)
    }


@router.put("/{post_id}", dependencies=[Depends(require_role("admin", "editor"))])
async def update_blog_post(
    post_id: int,
    payload: BlogPostCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update an existing blog post.
    Accessible to: admin, editor
    """
    success, message, post = BlogService.update_blog_post(
        db,
        post_id,
        category_id=payload.category_id,
        title_en=payload.title_en,
        title_id=payload.title_id,
        slug=payload.slug,
        excerpt_en=payload.excerpt_en,
        excerpt_id=payload.excerpt_id,
        content_en=payload.content_en,
        content_id=payload.content_id,
        author_name=payload.author_name,
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
        "data": BlogService.format(post, db=db, lang="en", detail=True)
    }


@router.delete("/{post_id}", dependencies=[Depends(require_role("admin", "editor"))])
async def delete_blog_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a blog post.
    Accessible to: admin, editor
    """
    success, message = BlogService.delete_blog_post(db, post_id)
    
    if not success:
        raise HTTPException(status_code=404, detail=message)
    
    return {
        "success": True,
        "message": message
    }
