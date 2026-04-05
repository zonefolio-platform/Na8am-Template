// src/types/template.ts
// Canonical data contract — matches public/mock-portfolio-api-response.json exactly.

export interface SocialLink {
  platform: string; // "GitHub" | "LinkedIn" | "Twitter"
  url: string;
}

export interface ExperienceItem {
  position: string;
  company: string;
  duration: string;
  description?: string;
}

export interface EducationItem {
  degree: string;
  university: string;
  from: string;
  to: string;
  GPA?: string;
}

export interface Project {
  name: string;
  description?: string;
  image?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface TemplateData {
  hero?: {
    name?: string;
    title?: string;
    image?: string;
    socialLinks?: SocialLink[];
  };
  about?: {
    bio?: string;
    image?: string;
    skills?: string[];
    experience?: ExperienceItem[];
    education?: EducationItem[];
  };
  projects?: {
    projects: Project[]; // nested object — matches mock shape exactly
  };
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    whatsapp?: string;
  };
}
