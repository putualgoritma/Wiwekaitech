from fastapi import APIRouter, Depends, HTTPException, status, Response
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import timedelta
from app.database import get_db
from app.services.auth_service import AuthService
from app.config import settings
from app.utils.auth import get_current_user


router = APIRouter(prefix="/admin", tags=["admin-auth"])


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    success: bool
    message: str
    user: dict = None


class CurrentUserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str
    is_active: bool


@router.post("/login")
async def login(request: LoginRequest, response: Response, db: Session = Depends(get_db)):
    """
    Login endpoint - authenticates user and returns JWT token in HTTP-only cookie.
    """
    user = AuthService.authenticate_user(db, request.username, request.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    
    # Generate JWT token
    access_token = AuthService.generate_jwt_token(
        user_id=user.id,
        username=user.username,
        role=user.role,
        expires_delta=timedelta(hours=settings.JWT_EXPIRATION_HOURS)
    )
    
    # Set HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=settings.ENVIRONMENT == "production",
        samesite="lax",
        max_age=settings.JWT_EXPIRATION_HOURS * 3600,
    )
    
    return {
        "success": True,
        "message": "Login successful",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        }
    }


@router.post("/logout")
@router.get("/logout")
async def logout(response: Response):
    """
    Logout endpoint - clears JWT token cookie.
    Supports both GET and POST methods for flexibility.
    """
    response.delete_cookie(
        key="access_token",
        secure=settings.ENVIRONMENT == "production",
        samesite="lax",
    )
    
    return {"success": True, "message": "Logout successful"}


@router.get("/me", response_model=CurrentUserResponse)
async def get_current_user_info(current_user = Depends(get_current_user)):
    """
    Get current authenticated user information.
    Protected endpoint - requires valid JWT token.
    """
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "role": current_user.role,
        "is_active": current_user.is_active,
    }
