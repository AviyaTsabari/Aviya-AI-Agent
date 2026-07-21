export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface ExperienceResponse {
  experience: ExperienceItem[];
}
