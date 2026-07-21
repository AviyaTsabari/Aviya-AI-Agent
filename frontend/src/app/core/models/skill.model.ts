export interface Skill {
  name: string;
  level: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface SkillsResponse {
  categories: SkillCategory[];
}
