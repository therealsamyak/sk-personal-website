export interface Project {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: "Vehicle Net",
    description:
      "Decentralized vehicle condition reporting system with cryptographically signed reports and smart contract integration.",
    image: "/placeholder.svg",
    link: "https://github.com/poke-key/vehicle-net",
    tags: [
      "Rust",
      "TypeScript",
      "Next.js",
      "TailwindCSS",
      "shadcn/ui",
      "Solidity",
      "Wagmi",
      "Vercel",
    ],
  },
  {
    title: "Personal Portfolio Website",
    description:
      "Modern, responsive portfolio built with Next.js 15, TypeScript, and TailwindCSS with dark/light theme toggle.",
    image: "/placeholder.svg",
    link: "https://github.com/therealsamyak/sk-personal-website",
    tags: ["TypeScript", "Next.js", "React", "TailwindCSS", "shadcn/ui", "Cloudflare"],
  },
  {
    title: "Azur Lane ECGC",
    description:
      "Mobile-friendly gaming guide with automated Python data scraping, achieving 5000+ monthly clicks.",
    image: "/azurlaneecgc.png",
    link: "https://github.com/samheart564/ecgc-dev",
    tags: ["Python", "TypeScript", "Astro", "React", "TailwindCSS", "Bun", "Astral", "Cloudflare"],
  },
  {
    title: "Poll Spree",
    description:
      "Real-time voting platform with user authentication and live result updates using Convex backend.",
    image: "/placeholder.svg",
    link: "https://github.com/therealsamyak/poll-spree",
    tags: [
      "TypeScript",
      "React",
      "TailwindCSS",
      "TanStack Router",
      "Vite",
      "shadcn/ui",
      "Clerk",
      "Convex",
      "Vercel",
    ],
  },
  {
    title: "BikeTitans",
    description:
      "IoT bike rack monitoring system with ESP32-CAM and YOLOv5 image recognition for automated analysis.",
    image: "/placeholder.svg",
    link: "https://github.com/jyroball/BikeTitans/",
    tags: [
      "C++",
      "Python",
      "Svelte",
      "TailwindCSS",
      "Astral",
      "OpenCV",
      "YOLOv5",
      "ESP32",
      "PlatformIO",
    ],
  },
  {
    title: "Edge Security System",
    description:
      "Real-time face recognition security system with ESP32-CAM streaming and Docker deployment on Jetson Nano.",
    image: "/placeholder.svg",
    link: "https://github.com/therealsamyak/edge-security-system",
    tags: [
      "C++",
      "Python",
      "Astral",
      "OpenCV",
      "Supabase",
      "Docker",
      "ESP32",
      "Jetson Nano",
      "PlatformIO",
    ],
  },
  {
    title: "CUDA Ray-Tracer",
    description:
      "Real-time 3D ray tracer with GPU-accelerated intersections and interactive SDL2 renderer.",
    image: "/placeholder.svg",
    link: "https://github.com/therealsamyak/basic-ray-tracer",
    tags: ["C++", "CUDA", "SDL"],
  },
  {
    title: "Casino Game",
    description:
      "Collaborative C++ casino application with encrypted login system and AI opponent using Scrum methodology.",
    image: "/placeholder.svg",
    link: "https://github.com/therealsamyak/CasinoGame",
    tags: ["C++", "Google Test"],
  },
]
