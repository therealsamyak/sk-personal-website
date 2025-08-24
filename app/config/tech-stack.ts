export interface TechCategory {
  category: string
  skills: string[]
  color: string
}

export const technologies: TechCategory[] = [
  {
    category: "Frontend",
    skills: ["JavaScript", "TypeScript", "Next.js", "Astro", "TailwindCSS"],
    color: "blue",
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "Rust"],
    color: "green",
  },
  {
    category: "Embedded",
    skills: ["C++", "ESP32"],
    color: "red",
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "AWS RDS",
      "AWS Amplify",
      "Cloudflare Workers",
      "Vercel",
      "Docker",
      "Nginx",
      "Linux",
      "GitHub",
    ],
    color: "orange",
  },
  {
    category: "Tools",
    skills: ["Git", "Bun", "Jest", "Stagehand", "Convex", "PlatformIO", "Cursor", "Claude Code"],
    color: "purple",
  },
]

export const getTechColor = (skillName: string): string => {
  for (const tech of technologies) {
    if (tech.skills.includes(skillName)) {
      return tech.color
    }
  }
  return "gray"
}

export const getColorClasses = (color: string): string => {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-800 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800"
    case "green":
      return "bg-green-100 text-green-800 ring-green-200 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-800"
    case "orange":
      return "bg-orange-100 text-orange-800 ring-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:ring-orange-800"
    case "purple":
      return "bg-purple-100 text-purple-800 ring-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:ring-purple-800"
    case "red":
      return "bg-red-100 text-red-800 ring-red-200 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-800"
    default:
      return "bg-gray-100 text-gray-800 ring-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:ring-gray-800"
  }
}
