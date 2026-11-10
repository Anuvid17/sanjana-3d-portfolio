export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  description: string;
  keyContributions: string[];
  metrics?: { label: string; value: string }[];
  image: string;
  colSpan: string;
  aspectRatio: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface JournalItem {
  id: string;
  title: string;
  topic: string;
  readTime: string;
  date: string;
  summary: string;
  takeaways: string[];
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  aspect: string;
  rotation: number;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  contributions: string[];
}

export interface EducationItem {
  degree: string;
  specialization?: string;
  institution: string;
  period: string;
  score?: string;
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  credentialUrl: string;
  verificationId?: string;
  skills: string[];
  platform: string;
}
