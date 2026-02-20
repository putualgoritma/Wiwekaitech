from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.auth import get_current_user, require_role
from app.services.auth_service import AuthService
from app.schemas.admin_schemas import UserCreateUpdate, UserResponse
from app.models import User

router = APIRouter(prefix="/users", tags=["admin-users"])


@router.get("", dependencies=[Depends(require_role("admin"))])
async def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all admin users.
    Accessible to: admin only
    """
    users = db.query(User).all()
    return {
        "success": True,
        "data": [
            {
                "id": u.id,
                "username": u.username,
                "email": u.email,
                "role": u.role,
                "is_active": u.is_active,
                "created_at": u.created_at.isoformat(),
                "updated_at": u.updated_at.isoformat(),
            }
            for u in users
        ]
    }


@router.get("/{user_id}", dependencies=[Depends(require_role("admin"))])
async def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific user by ID.
    Accessible to: admin only
    """
    user = AuthService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "success": True,
        "data": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": user.created_at.isoformat(),
            "updated_at": user.updated_at.isoformat(),
        }
    }


@router.post("", dependencies=[Depends(require_role("admin"))])
async def create_user(
    payload: UserCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new admin user.
    Accessible to: admin only
    """
    if not payload.password:
        raise HTTPException(status_code=400, detail="Password is required for new users")
    
    success, message, user = AuthService.create_user(
        db,
        username=payload.username,
        email=payload.email,
        password=payload.password,
        role=payload.role,
    )
    
    if not success:
        raise HTTPException(status_code=400, detail=message)
    
    return {
        "success": True,
        "message": message,
        "data": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": user.created_at.isoformat(),
            "updated_at": user.updated_at.isoformat(),
        }
    }


@router.put("/{user_id}", dependencies=[Depends(require_role("admin"))])
async def update_user(
    user_id: int,
    payload: UserCreateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update an existing user.
    Accessible to: admin only
    """
    user = AuthService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update basic fields
    user.username = payload.username
    user.email = payload.email
    user.role = payload.role
    user.is_active = payload.is_active
    
    # Update password if provided
    if payload.password:
        user.password_hash = AuthService.hash_password(payload.password)
    
    db.commit()
    db.refresh(user)
    
    return {
        "success": True,
        "message": "User updated successfully",
        "data": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": user.created_at.isoformat(),
            "updated_at": user.updated_at.isoformat(),
        }
    }


@router.delete("/{user_id}", dependencies=[Depends(require_role("admin"))])
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a user.
    Accessible to: admin only
    """
    # Prevent deleting the current user
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
    
    user = AuthService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    
    return {
        "success": True,
        "message": "User deleted successfully"
    }
