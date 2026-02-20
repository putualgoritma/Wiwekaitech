from typing import Callable, Optional
from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.auth_service import AuthService


async def get_current_user(
    token: Optional[str] = Cookie(None, alias="access_token"),
    db: Session = Depends(get_db)
):
    """
    Verify JWT token from cookies and return current user information.
    This is a dependency that can be injected into route handlers.
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    
    user_data = AuthService.verify_jwt_token(token)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    
    user = AuthService.get_user_by_id(db, user_data["user_id"])
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
        )
    
    return user


def require_role(*allowed_roles: str) -> Callable:
    """
    Factory function to create a role-based access control dependency.
    
    Usage:
        @router.get("/admin", dependencies=[Depends(require_role("admin"))])
        async def admin_route():
            pass
        
        @router.put("/editor", dependencies=[Depends(require_role("admin", "editor"))])
        async def editor_route():
            pass
    """
    async def check_role(current_user = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"User role '{current_user.role}' does not have access to this resource",
            )
        return current_user
    
    return check_role
