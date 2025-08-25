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
  title: "Full Stack Developer",
  description:
    "Passionate about Coding, Marketing, Business, and the economic state of the world currently.\n I have extensive experience in Python, C++, and Typescript, and enough vibe-coding experience to pick up any skill necessary to get work done.",
  profileImage: "/pfp.jpeg", // Optional: remove or set to undefined to hide profile image
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
      url: "https://x.com/samheart564",
      icon: "siX",
    },
  ],
}

export const navigation = [
  { name: "About", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]
