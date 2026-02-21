from fastapi import APIRouter, Depends, HTTPException, Request, Form, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.auth import get_current_user
from app.models import User
import os

# Setup Jinja2 templates
templates_dir = os.path.join(os.path.dirname(__file__), "..", "templates")
templates = Jinja2Templates(directory=templates_dir)

router = APIRouter(prefix="", tags=["admin-templates"])


@router.get("/admin/login", response_class=HTMLResponse)
async def login_page(request: Request):
    """Render admin login page"""
    return templates.TemplateResponse("login.html", {"request": request})


@router.get("/admin/logout")
async def logout_and_redirect():
    """Logout and redirect to login page"""
    from app.config import settings
    response = RedirectResponse(url="/admin/login", status_code=302)
    response.delete_cookie(
        key="access_token",
        secure=settings.ENVIRONMENT == "production",
        samesite="lax",
    )
    return response


@router.get("/admin/dashboard", response_class=HTMLResponse)
async def dashboard(
    request: Request,
    current_user: User = Depends(get_current_user)
):
    """Render admin dashboard (protected)"""
    return templates.TemplateResponse(
        "dashboard.html",
        {
            "request": request,
            "user": current_user,
        }
    )


# Products
@router.get("/admin/products", response_class=HTMLResponse)
async def products_list(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render products list page"""
    from app.services.product_service import ProductService
    products = ProductService.get_all_products_admin(db)
    
    return templates.TemplateResponse(
        "products/list.html",
        {
            "request": request,
            "user": current_user,
            "products": products,
        }
    )


@router.get("/admin/products/create", response_class=HTMLResponse)
async def product_create_page(
    request: Request,
    current_user: User = Depends(get_current_user)
):
    """Render product create form"""
    # Check if user is editor or admin
    if current_user.role not in ("admin", "editor"):
        raise HTTPException(status_code=403, detail="Forbidden")
    
    return templates.TemplateResponse(
        "products/create.html",
        {
            "request": request,
            "user": current_user,
        }
    )


@router.get("/admin/products/{product_id}/edit", response_class=HTMLResponse)
async def product_edit_page(
    request: Request,
    product_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render product edit form"""
    # Check if user is editor or admin
    if current_user.role not in ("admin", "editor"):
        raise HTTPException(status_code=403, detail="Forbidden")
    
    from app.services.product_service import ProductService
    product = ProductService.get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return templates.TemplateResponse(
        "products/edit.html",
        {
            "request": request,
            "user": current_user,
            "product": product,
        }
    )


# Projects
@router.get("/admin/projects", response_class=HTMLResponse)
async def projects_list(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render projects list page"""
    from app.services.project_service import ProjectService
    projects = ProjectService.get_all_projects_admin(db)
    
    return templates.TemplateResponse(
        "projects/list.html",
        {
            "request": request,
            "user": current_user,
            "projects": projects,
        }
    )


@router.get("/admin/projects/create", response_class=HTMLResponse)
async def project_create_page(
    request: Request,
    current_user: User = Depends(get_current_user)
):
    """Render project create form"""
    if current_user.role not in ("admin", "editor"):
        raise HTTPException(status_code=403, detail="Forbidden")
    
    return templates.TemplateResponse(
        "projects/create.html",
        {
            "request": request,
            "user": current_user,
        }
    )


@router.get("/admin/projects/{project_id}/edit", response_class=HTMLResponse)
async def project_edit_page(
    request: Request,
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render project edit form"""
    if current_user.role not in ("admin", "editor"):
        raise HTTPException(status_code=403, detail="Forbidden")
    
    from app.services.project_service import ProjectService
    project = ProjectService.get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return templates.TemplateResponse(
        "projects/edit.html",
        {
            "request": request,
            "user": current_user,
            "project": project,
        }
    )


# Tutorials
@router.get("/admin/tutorials", response_class=HTMLResponse)
async def tutorials_list(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render tutorials list page"""
    from app.services.tutorial_service import TutorialService
    tutorials = TutorialService.get_all_tutorials_admin(db)
    
    return templates.TemplateResponse(
        "tutorials/list.html",
        {
            "request": request,
            "user": current_user,
            "tutorials": tutorials,
        }
    )


@router.get("/admin/tutorials/create", response_class=HTMLResponse)
async def tutorial_create_page(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render tutorial create form"""
    if current_user.role not in ("admin", "editor"):
        raise HTTPException(status_code=403, detail="Forbidden")
    
    from app.services.category_service import CategoryService
    categories = CategoryService.get_categories_by_type(db, "tutorial")
    
    return templates.TemplateResponse(
        "tutorials/create.html",
        {
            "request": request,
            "user": current_user,
            "categories": categories,
        }
    )


@router.get("/admin/tutorials/{tutorial_id}/edit", response_class=HTMLResponse)
async def tutorial_edit_page(
    request: Request,
    tutorial_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render tutorial edit form"""
    if current_user.role not in ("admin", "editor"):
        raise HTTPException(status_code=403, detail="Forbidden")
    
    from app.services.tutorial_service import TutorialService
    from app.services.category_service import CategoryService
    tutorial = TutorialService.get_tutorial_by_id(db, tutorial_id)
    if not tutorial:
        raise HTTPException(status_code=404, detail="Tutorial not found")
    
    categories = CategoryService.get_categories_by_type(db, "tutorial")
    
    return templates.TemplateResponse(
        "tutorials/edit.html",
        {
            "request": request,
            "user": current_user,
            "tutorial": tutorial,
            "categories": categories,
        }
    )


# Blog
@router.get("/admin/blog", response_class=HTMLResponse)
async def blog_list(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render blog posts list page"""
    from app.services.blog_service import BlogService
    posts = BlogService.get_all_blog_posts_admin(db)
    
    return templates.TemplateResponse(
        "blog/list.html",
        {
            "request": request,
            "user": current_user,
            "posts": posts,
        }
    )


@router.get("/admin/blog/create", response_class=HTMLResponse)
async def blog_create_page(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render blog create form"""
    if current_user.role not in ("admin", "editor"):
        raise HTTPException(status_code=403, detail="Forbidden")
    
    from app.services.category_service import CategoryService
    categories = CategoryService.get_categories_by_type(db, "blog")
    
    return templates.TemplateResponse(
        "blog/create.html",
        {
            "request": request,
            "user": current_user,
            "categories": categories,
        }
    )


@router.get("/admin/blog/{post_id}/edit", response_class=HTMLResponse)
async def blog_edit_page(
    request: Request,
    post_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render blog edit form"""
    if current_user.role not in ("admin", "editor"):
        raise HTTPException(status_code=403, detail="Forbidden")
    
    from app.services.blog_service import BlogService
    from app.services.category_service import CategoryService
    post = BlogService.get_blog_post_by_id(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    categories = CategoryService.get_categories_by_type(db, "blog")
    
    return templates.TemplateResponse(
        "blog/edit.html",
        {
            "request": request,
            "user": current_user,
            "post": post,
            "categories": categories,
        }
    )


# Users (admin only)
@router.get("/admin/users", response_class=HTMLResponse)
async def users_list(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render users list page (admin only)"""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    users = db.query(User).all()
    
    return templates.TemplateResponse(
        "users/list.html",
        {
            "request": request,
            "user": current_user,
            "users": users,
        }
    )


@router.get("/admin/users/create", response_class=HTMLResponse)
async def user_create_page(
    request: Request,
    current_user: User = Depends(get_current_user)
):
    """Render user create form (admin only)"""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    roles = ["admin", "editor", "viewer"]
    return templates.TemplateResponse(
        "users/create.html",
        {
            "request": request,
            "user": current_user,
            "roles": roles,
        }
    )


@router.get("/admin/users/{user_id}/edit", response_class=HTMLResponse)
async def user_edit_page(
    request: Request,
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Render user edit form (admin only)"""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    roles = ["admin", "editor", "viewer"]
    return templates.TemplateResponse(
        "users/edit.html",
        {
            "request": request,
            "user": current_user,
            "edit_user": user,
            "roles": roles,
        }
    )
