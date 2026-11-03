import re

BLOCKED_REPLY = "אופסס.. נטפרי לא מרשה לי לדבר איתך על זה"

_BLOCKED_PATTERNS = [
    re.compile(pattern, re.IGNORECASE)
    for pattern in (
        r"\breligio(?:n|us)\b",
        r"\bchristian(?:ity)?\b",
        r"\bgossip\b",
        r"\blove stor(?:y|ies)\b",
        r"\bromance\b",
        r"\breproduct(?:ion|ive)\b",
        r"\bsexual(?:ity)?\b",
        r"\badulter(?:y|ous)\b",
        r"\bintimate\b",
        r"דת",
        r"נצרות",
        r"רכילות",
        r"סיפורי אהבה",
        r"אהבה",
        r"רבייה",
        r"מין",
        r"ניאוף",
        r"אינטימי",
    )
]


def is_blocked(text: str) -> bool:
    return any(pattern.search(text) for pattern in _BLOCKED_PATTERNS)
