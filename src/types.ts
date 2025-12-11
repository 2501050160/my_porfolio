export interface SiteData {
  siteMeta: {
    title: string;
    description: string;
    author: string;
  };
  hero: {
    greeting: string;
    firstName: string;
    lastName: string;
    roles: string[];
    lead: string;
    location: string;
    availability: string;
    social: {
      github: string;
      linkedin: string;
      email: string;
      phone: string;
    };
    cta: {
      projects: string;
      contact: string;
    };
    stats: Array<{ label: string; value: number }>;
  };
  about: {
    summary: string;
    skills: {
      iot: string[];
      web: string[];
      tools: string[];
    };
    education: Array<{
      degree: string;
      institution: string;
      period: string;
      grade: string;
    }>;
    leadership: {
      role: string;
      members: number;
      projectsGuided: number;
      workshopsOrganized: number;
      achievements: string[];
    };
    internship: {
      company: string;
      period: string;
      highlights: string[];
    };
    counters: Array<{ label: string; value: number }>;
  };
  projects: {
    stats: {
      iotTotal: number;
      major: number;
      mini: number;
      webAndFullStack: number;
    };
    keyProjects: Array<{
      id: string;
      title: string;
      short: string;
      description: string;
      technologies: string[];
      category: 'iot' | 'fullstack' | 'web';
      features: string[];
      highlighted: boolean;
    }>;
    categories: {
      major: string[];
      mini: string[];
      web: string[];
    };
  };
  certificates: {
    firstPrize: Array<{ id: number; title: string; event: string; image: string }>;
    secondPrize: Array<{ id: number; title: string; event: string; image: string }>;
    thirdPrize: Array<{ id: number; title: string; event: string; image: string }>;
    professional: Array<{ id: number; title: string; image: string }>;
    notes: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    apiEndpoint: string;
  };
  footer: {
    copyrightName: string;
    links: {
      github: string;
      linkedin: string;
    };
  };
}