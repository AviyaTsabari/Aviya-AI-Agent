export interface Language {
  language: string;
  proficiency: string;
}

export interface Contact {
  github: string;
}

export interface Education {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  highlights: string[];
}

export interface RolePreferences {
  seeking: string[];
  workType: string[];
  remote: string;
}

export interface Profile {
  name: string;
  title: string;
  headline: string;
  location: string;

  languages: Language[];

  contact: Contact;

  summary: string;

  education: Education[];

  interests: string[];

  rolePreferences: RolePreferences;
}