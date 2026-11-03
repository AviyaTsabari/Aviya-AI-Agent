from typing import Any


def _uses_hebrew(text: str) -> bool:
    return any("א" <= char <= "ת" for char in text)


def _join_skills(knowledge: dict[str, Any]) -> str:
    names: list[str] = []
    for category in knowledge.get("skills", {}).get("categories", []):
        category_name = category.get("name", "")
        skill_bits = [
            f"{skill['name']} ({skill['level']})"
            for skill in category.get("skills", [])
            if skill.get("name")
        ]
        if skill_bits:
            names.append(f"{category_name}: {', '.join(skill_bits)}")
    return "\n".join(names)


def _project_summary(project: dict[str, Any], hebrew: bool) -> str:
    highlights = "; ".join(project.get("highlights") or [])
    tech = ", ".join(project.get("technologies") or [])
    if hebrew:
        return (
            f"{project.get('name')}: {project.get('description') or project.get('shortDescription')}"
            f" טכנולוגיות: {tech}."
            + (f" דגשים: {highlights}." if highlights else "")
        )
    return (
        f"{project.get('name')}: {project.get('description') or project.get('shortDescription')}"
        f" Technologies: {tech}."
        + (f" Highlights: {highlights}." if highlights else "")
    )


def _match_project(message: str, knowledge: dict[str, Any]) -> dict[str, Any] | None:
    lowered = message.lower()
    for project in knowledge.get("projects", {}).get("projects", []):
        name = (project.get("name") or "").lower()
        project_id = (project.get("id") or "").lower()
        if name and name in lowered:
            return project
        if project_id and project_id.replace("-", " ") in lowered:
            return project
        if "compiler" in lowered and "compiler" in name:
            return project
        if ("reverse" in lowered or "הנדסה לאחור" in message) and "reverse" in name:
            return project
    return None


def generate_offline_reply(message: str, knowledge: dict[str, Any]) -> str:
    hebrew = _uses_hebrew(message)
    lowered = message.lower()
    profile = knowledge.get("profile", {})
    name = profile.get("name", "Aviya Yosef")
    title = profile.get("title", "Software Developer")
    summary = profile.get("summary", "")
    role = profile.get("rolePreferences", {})
    github = (profile.get("contact") or {}).get("github", "")

    matched_project = _match_project(message, knowledge)
    if matched_project:
        return _project_summary(matched_project, hebrew)

    if any(word in lowered for word in ("skill", "technolog", "stack", "כישור", "טכנולוג")):
        skills = _join_skills(knowledge)
        if hebrew:
            return f"הכישורים המרכזיים שלי:\n{skills}"
        return f"My core skills:\n{skills}"

    if any(word in lowered for word in ("project", "portfolio", "github", "פרויקט")):
        projects = knowledge.get("projects", {}).get("projects", [])
        lines = [_project_summary(project, hebrew) for project in projects]
        if hebrew:
            intro = "הנה הפרויקטים שאפשר לדבר עליהם:"
            extra = f"\nGitHub: {github}" if github else ""
            return intro + "\n\n" + "\n\n".join(lines) + extra
        intro = "Here are the projects I can talk about:"
        extra = f"\nGitHub: {github}" if github else ""
        return intro + "\n\n" + "\n\n".join(lines) + extra

    if any(word in lowered for word in ("experience", "work", "job", "ניסיון", "עבוד")):
        items = knowledge.get("experience", {}).get("experience", [])
        if not items:
            if hebrew:
                return "עדיין אין לי ניסיון תעסוקתי רשמי. הרקע שלי מגיע בעיקר מלימודי מדעי המחשב ומפרויקטים מעשיים."
            return (
                "I don't have formal industry employment listed yet. "
                "My background comes from Computer Science studies and hands-on software projects."
            )
        parts = []
        for item in items:
            company = f" at {item['company']}" if item.get("company") else ""
            parts.append(
                f"{item.get('title')}{company}: {item.get('description')}"
            )
        if hebrew:
            return "בקצרה על הניסיון שלי:\n" + "\n".join(parts)
        return "Here's a short overview of my experience:\n" + "\n".join(parts)

    if any(word in lowered for word in ("educat", "degree", "stud", "לימוד", "תואר", "השכל")):
        education = profile.get("education") or []
        if not education:
            if hebrew:
                return "אני בוגרת מדעי המחשב. אם תרצו פרטים נוספים על המוסד, אפשר לפנות אליי ישירות."
            return "I'm a Computer Science graduate. Reach out directly if you'd like more detail about the institution."
        edu = education[0]
        highlights = ", ".join(edu.get("highlights") or [])
        institution = edu.get("institution") or ("מוסד לימודים" if hebrew else "my university")
        if hebrew:
            return f"יש לי {edu.get('degree')} מ{institution}. דגשים בלימודים: {highlights}."
        return f"I hold a {edu.get('degree')} from {institution}. Coursework highlights: {highlights}."

    if any(
        word in lowered
        for word in ("role", "looking", "junior", "hire", "candidate", "תפקיד", "מחפשת", "משרה")
    ):
        seeking = ", ".join(role.get("seeking") or [])
        work_type = ", ".join(role.get("workType") or [])
        remote = role.get("remote", "")
        if hebrew:
            return (
                f"אני מחפשת תפקיד מסוג {seeking}. "
                f"סוג משרה: {work_type}. {remote}."
            )
        return (
            f"I'm looking for roles such as {seeking}. "
            f"Work type: {work_type}. {remote}."
        )

    if any(word in lowered for word in ("language", "hebrew", "english", "שפה", "עברית", "אנגלית")):
        languages = profile.get("languages") or []
        bits = [f"{item.get('language')} ({item.get('proficiency')})" for item in languages]
        if hebrew:
            return "השפות שלי: " + ", ".join(bits)
        return "Languages I work in: " + ", ".join(bits)

    if hebrew:
        return (
            f"היי, אני {name}, {title}. {summary} "
            "אפשר לשאול אותי על כישורים, פרויקטים, ניסיון או איזה תפקיד אני מחפשת."
        )
    return (
        f"Hi, I'm {name}, a {title}. {summary} "
        "Ask me about my skills, projects, experience, or the roles I'm looking for."
    )
