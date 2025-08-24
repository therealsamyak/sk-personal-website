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
  socialLinks: SocialLink[]
}

export const personalInfo: PersonalInfo = {
  name: "Samyak Kakatur",
  title: "Full Stack Developer",
  description:
    "Building digital experiences with modern technologies. Focused on creating elegant solutions to complex problems.",
  profileImage: "/pfp.jpeg", // Optional: remove or set to undefined to hide profile image
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
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]
