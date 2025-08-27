export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface PersonalInfo {
  name: string
  title: string
  description: string
  email?: string
  profileImage?: string
  resumeUrl?: string
  socialLinks: SocialLink[]
}

export const personalInfo: PersonalInfo = {
  name: "Samyak Kakatur",
  title: "Software Engineer & IoT Specialist",
  description:
    "Computer Science student at UCLA pursuing Master's in IoT Systems. Experienced in full-stack development, embedded systems, and AI/ML. Passionate about building innovative solutions from web applications to edge computing systems.",
  email: "therealsamyak@gmail.com",
  profileImage: "/pfp.jpeg",
  resumeUrl: "https://example.com/your-resume.pdf", // Optional: set your resume URL here
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/therealsamyak",
      icon: "siGithub",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/samyakkakatur",
      icon: "siLinkedin",
    },
    {
      platform: "Twitter",
      url: "https://x.com/skakatur_dev",
      icon: "siX",
    },
  ],
}

export const navigation = [
  { name: "About", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]
