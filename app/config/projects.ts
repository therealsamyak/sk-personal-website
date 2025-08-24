export interface Project {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with Next.js, Prisma, and Stripe integration.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["Next.js", "Prisma", "Stripe"],
  },
  {
    title: "Task Management App",
    description: "A real-time task management application with team collaboration features.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["React", "Node.js", "Socket.io"],
  },
  {
    title: "AI Chat Interface",
    description: "An AI-powered chat interface with natural language processing capabilities.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["OpenAI", "Next.js", "TailwindCSS"],
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard with location-based forecasts and interactive maps.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["Vue.js", "Weather API", "Chart.js"],
  },
  {
    title: "Social Media Analytics",
    description:
      "A comprehensive analytics platform for tracking social media performance and engagement.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["Python", "Django", "PostgreSQL"],
  },
  {
    title: "Cryptocurrency Tracker",
    description:
      "Real-time cryptocurrency portfolio tracker with price alerts and market analysis.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["React Native", "Redux", "CoinGecko API"],
  },
]
