from sqlalchemy.orm import Session
from app.models import ContactMessage
from app.schemas import ContactCreate
from typing import Optional


class ContactService:
    @staticmethod
    def create_message(
        db: Session,
        message_data: ContactCreate,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None
    ) -> ContactMessage:
        """Create a new contact message"""
        message = ContactMessage(
            name=message_data.name,
            email=message_data.email,
            phone=message_data.phone,
            company=message_data.company,
            subject=message_data.subject,
            message=message_data.message,
            preferred_contact=message_data.preferred_contact,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        db.add(message)
        db.commit()
        db.refresh(message)
        
        return message
