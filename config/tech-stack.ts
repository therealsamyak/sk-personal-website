export interface TechCategory {
  category: string
  skills: string[]
  color: string
}

export const technologies: TechCategory[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TanStack Router",
      "Svelte",
      "Astro",
      "Vite",
      "TailwindCSS",
      "shadcn/ui",
    ],
    color: "green",
  },
  {
    category: "Backend & Databases",
    skills: [
      "Bun",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "Snowflake",
      "Supabase",
      "Convex",
      "Clerk",
      "WorkOS",
    ],
    color: "red",
  },
  {
    category: "Hardware & Embedded",
    skills: ["ESP32", "PlatformIO", "Jetson Nano", "SDL"],
    color: "indigo",
  },
  {
    category: "Infrastructure & Cloud",
    skills: ["AWS", "Cloudflare", "Vercel", "Docker", "GitHub Actions"],
    color: "orange",
  },
  {
    category: "Languages",
    skills: ["TypeScript", "Python", "C++", "CUDA", "Rust"],
    color: "blue",
  },
  {
    category: "LLM & Computer Vision",
    skills: ["OpenCV", "YOLO", "LM Studio", "Ollama", "GPT-OSS", "AI SDK"],
    color: "purple",
  },
  // {
  //   category: "Blockchain & Web3",
  //   skills: ["Solidity", "Foundry", "Wagmi", "Polar.sh"],
  //   color: "yellow",
  // },
  {
    category: "AI Workflow",
    skills: [
      "Claude Code",
      "OpenCode",
      "GitHub Copilot",
      "Gemini",
      "Codex",
      "Cursor",
      "Z.ai",
      "Greptile",
    ],
    color: "cyan",
  },
  {
    category: "Tools",
    skills: ["Git", "Astral", "Stagehand", "Jest", "Google Test"],
    color: "fuchsia",
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
    case "cyan":
      return "bg-cyan-100 text-cyan-800 ring-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:ring-cyan-800"
    case "green":
      return "bg-green-100 text-green-800 ring-green-200 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-800"
    case "orange":
      return "bg-orange-100 text-orange-800 ring-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:ring-orange-800"
    case "purple":
      return "bg-purple-100 text-purple-800 ring-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:ring-purple-800"
    case "red":
      return "bg-red-100 text-red-800 ring-red-200 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-800"
    case "yellow":
      return "bg-yellow-100 text-yellow-800 ring-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-800"
    case "indigo":
      return "bg-indigo-100 text-indigo-800 ring-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:ring-indigo-800"
    case "fuchsia":
      return "bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-200 dark:bg-fuchsia-900/20 dark:text-fuchsia-300 dark:ring-fuchsia-800"
    default:
      return "bg-gray-100 text-gray-800 ring-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:ring-gray-800"
  }
}
