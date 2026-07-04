// src/types/index.ts

export type SkillCategory = 'Frontend' | 'Backend' | 'Librerías Frontend' | 'Bases de Datos' | 'Herramientas';

export interface Skill {
  name: string;
  icon: string;
  level: 1 | 2 | 3 | 4 | 5;
  category: SkillCategory;
}

export interface ProjectImage {
  url: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  images?: ProjectImage[];
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  cvUrl: string;
  location?: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  roles: string[];
  stats: Stat[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
}

export type SectionId =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'contact';

export interface NavLink {
  id: SectionId;
  label: string;
}
