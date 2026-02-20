"""
Pagination utilities - eliminates duplicate pagination logic across services.
"""

from typing import List, Tuple, TypeVar, Any
from sqlalchemy.orm import Query
from pydantic import BaseModel, Field

T = TypeVar('T')


class PaginationParams(BaseModel):
    """Standard pagination parameters"""
    page: int = Field(1, ge=1)
    page_size: int = Field(10, ge=1, le=100)

    def validate_bounds(self):
        """Ensure page and page_size are within valid bounds"""
        if self.page < 1:
            self.page = 1
        if self.page_size < 1:
            self.page_size = 1
        if self.page_size > 100:
            self.page_size = 100


def paginate(query: Query, params: PaginationParams) -> Tuple[List[Any], int]:
    """
    Apply pagination to a SQLAlchemy query.
    
    Args:
        query: SQLAlchemy Query object
        params: PaginationParams with page and page_size
        
    Returns:
        Tuple of (items, total_count)
    """
    params.validate_bounds()
    total = query.count()
    items = (
        query.offset((params.page - 1) * params.page_size)
        .limit(params.page_size)
        .all()
    )
    return items, total


def build_paginated_response(
    items: List[Any],
    total: int,
    params: PaginationParams
) -> dict:
    """
    Build standard paginated API response.
    
    Args:
        items: List of items to return
        total: Total count of items in database
        params: Original pagination params
        
    Returns:
        Dictionary with pagination metadata
    """
    total_pages = (total + params.page_size - 1) // params.page_size
    return {
        "data": items,
        "pagination": {
            "page": params.page,
            "page_size": params.page_size,
            "total": total,
            "total_pages": total_pages
        }
    }
