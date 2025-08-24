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
    tags: ["Next.js", "TypeScript", "AWS RDS", "Vercel", "TailwindCSS", "Jest"],
  },
  {
    title: "Task Management App",
    description: "A real-time task management application with team collaboration features.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["JavaScript", "Node.js", "Convex", "Docker", "GitHub"],
  },
  {
    title: "AI Chat Interface",
    description: "An AI-powered chat interface with natural language processing capabilities.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["Claude Code", "Next.js", "TailwindCSS", "Bun", "Cursor"],
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard with location-based forecasts and interactive maps.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["Astro", "TypeScript", "Cloudflare Workers", "Git"],
  },
  {
    title: "Social Media Analytics",
    description:
      "A comprehensive analytics platform for tracking social media performance and engagement.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["Python", "AWS Amplify", "Nginx", "Linux", "Docker"],
  },
  {
    title: "Cryptocurrency Tracker",
    description:
      "Real-time cryptocurrency portfolio tracker with price alerts and market analysis.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["Rust", "JavaScript", "Convex", "Stagehand", "GitHub"],
  },
  {
    title: "IoT Sensor Network",
    description:
      "Embedded system for environmental monitoring with wireless sensor network capabilities.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["C++", "PlatformIO", "ESP32"],
  },
  {
    title: "Smart Home Controller",
    description:
      "Embedded microcontroller system for automated home management and IoT device control.",
    image: "/placeholder.svg",
    link: "https://github.com",
    tags: ["C++", "ESP32", "PlatformIO"],
  },
]
