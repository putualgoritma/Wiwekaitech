"""
Shared formatters and language utilities for consistent response formatting.
Eliminates code duplication across all services.
"""

from enum import Enum
from typing import Any, Dict, List


class Language(str, Enum):
    """Supported languages"""
    EN = "en"
    ID = "id"


class BaseFormatter:
    """Base class for all entity formatters - centralizes language/formatting logic"""

    @staticmethod
    def select_by_language(en_value: Any, id_value: Any, lang: str) -> Any:
        """
        Select value based on language.
        
        Args:
            en_value: English version
            id_value: Indonesian version
            lang: Language code ('en' or 'id')
            
        Returns:
            Selected value based on language
            
        Raises:
            ValueError: If unsupported language
        """
        if lang == Language.EN.value or lang == Language.EN:
            return en_value
        elif lang == Language.ID.value or lang == Language.ID:
            return id_value
        raise ValueError(f"Unsupported language: {lang}")

    @staticmethod
    def format_translations(
        obj: Any,
        fields: List[str],
        lang: str
    ) -> Dict[str, Any]:
        """
        Generic formatter for objects with _en and _id field pairs.
        
        Example:
            format_translations(product, ["title", "description"], "en")
            Returns: {"title": product.title_en, "description": product.description_en}
        
        Args:
            obj: Object with _en and _id suffixed fields
            fields: List of field name bases (without suffix)
            lang: Language code
            
        Returns:
            Dictionary with translated fields
        """
        result = {}
        for field in fields:
            en_field = f"{field}_en"
            id_field = f"{field}_id"

            if hasattr(obj, en_field) and hasattr(obj, id_field):
                result[field] = BaseFormatter.select_by_language(
                    getattr(obj, en_field),
                    getattr(obj, id_field),
                    lang
                )
        return result
