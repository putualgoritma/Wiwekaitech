from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.utils.auth import get_current_user, require_role
from app.models import User
import os
import uuid
import time
from pathlib import Path

router = APIRouter(prefix="/upload", tags=["admin-upload"])

# Allowed image extensions
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


def generate_unique_filename(original_filename: str) -> str:
    """Generate a unique filename using timestamp and UUID"""
    ext = Path(original_filename).suffix.lower()
    timestamp = int(time.time())
    unique_id = uuid.uuid4().hex[:8]
    return f"{timestamp}_{unique_id}{ext}"


@router.post("/blog-image", dependencies=[Depends(require_role("admin", "editor"))])
async def upload_blog_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """
    Upload a blog post image.
    Accessible to: admin, editor
    
    Returns the URL path to access the uploaded image.
    """
    # Validate file extension
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Read file content
    content = await file.read()
    
    # Validate file size
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size: {MAX_FILE_SIZE / 1024 / 1024}MB"
        )
    
    # Generate unique filename
    filename = generate_unique_filename(file.filename)
    
    # Define upload path
    upload_dir = Path(__file__).parent.parent / "static" / "uploads" / "blog"
    upload_dir.mkdir(parents=True, exist_ok=True)
    file_path = upload_dir / filename
    
    # Save file
    try:
        with open(file_path, "wb") as f:
            f.write(content)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save file: {str(e)}"
        )
    
    # Return URL path (relative to static mount)
    image_url = f"/static/uploads/blog/{filename}"
    
    return {
        "success": True,
        "message": "Image uploaded successfully",
        "data": {
            "url": image_url,
            "filename": filename
        }
    }
