export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  role: string;
  technologies: string[];
  highlights: string[];
  repositoryUrl: string;
  liveUrl: string;
  status: string;
}

export interface ProjectsResponse {
  projects: Project[];
}
