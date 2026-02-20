from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.contact_service import ContactService
from app.schemas import ContactCreate
from typing import Optional

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", status_code=201)
async def create_contact_message(
    message_data: ContactCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """Submit contact form message"""
    # Get client IP and user agent
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    # Create message
    message = ContactService.create_message(
        db, message_data, ip_address, user_agent
    )
    
    return {
        "success": True,
        "message": "Thank you for contacting us. We will get back to you soon.",
        "data": {
            "id": message.id,
            "name": message.name,
            "email": message.email,
            "subject": message.subject,
            "created_at": message.created_at.isoformat()
        }
    }
