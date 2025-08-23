export interface Project {
  id: string;
  title: string;
  githubUrl: string;
  tools: string[];
  description: string;
  imageUrl?: string;
}

export interface Employment {
  id: string;
  company: string;
  role: string;
  startYear: number;
  endYear: number | 'Present';
  skills: string[];
  description: string;
}

export interface ContactLink {
  platform: string;
  url: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Personal Portfolio',
    githubUrl: 'https://github.com/yourusername/portfolio',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'anime.js'],
    description: 'A modern personal portfolio website with smooth animations and responsive design.',
    imageUrl: '/images/portfolio-screenshot.png'
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    githubUrl: 'https://github.com/yourusername/task-manager',
    tools: ['React', 'Node.js', 'MongoDB', 'Express'],
    description: 'Full-stack task management application with real-time updates and collaborative features.',
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    tools: ['Vue.js', 'JavaScript', 'Chart.js', 'API Integration'],
    description: 'Interactive weather dashboard with data visualization and location-based forecasts.',
  },
  {
    id: 'project-4',
    title: 'E-commerce Platform',
    githubUrl: 'https://github.com/yourusername/ecommerce',
    tools: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    description: 'Modern e-commerce platform with payment processing and inventory management.',
  }
];

export const employment: Employment[] = [
  {
    id: 'job-1',
    company: 'Tech Startup Inc.',
    role: 'Senior Frontend Developer',
    startYear: 2022,
    endYear: 'Present',
    skills: ['React', 'TypeScript', 'GraphQL', 'AWS', 'Docker'],
    description: 'Lead frontend development for a SaaS platform, implementing modern React patterns and optimizing performance.'
  },
  {
    id: 'job-2',
    company: 'Digital Agency Co.',
    role: 'Full Stack Developer',
    startYear: 2020,
    endYear: 2022,
    skills: ['Node.js', 'React', 'MongoDB', 'Express', 'REST APIs'],
    description: 'Built custom web applications for clients across various industries, from concept to deployment.'
  },
  {
    id: 'job-3',
    company: 'Fortune 500 Company',
    role: 'Junior Developer',
    startYear: 2019,
    endYear: 2020,
    skills: ['JavaScript', 'HTML/CSS', 'jQuery', 'PHP', 'MySQL'],
    description: 'Maintained and enhanced legacy web applications while transitioning to modern development practices.'
  }
];

export const contactLinks: ContactLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'github'
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/yourprofile',
    icon: 'linkedin'
  },
  {
    platform: 'Email',
    url: 'mailto:your.email@example.com',
    icon: 'mail'
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter'
  }
];

export const getAllTools = (): string[] => {
  const toolsSet = new Set<string>();
  projects.forEach(project => {
    project.tools.forEach(tool => toolsSet.add(tool));
  });
  return Array.from(toolsSet).sort();
};