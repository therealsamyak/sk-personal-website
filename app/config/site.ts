export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface PersonalInfo {
  name: string
  title: string
  description: string
  email: string
  profileImage?: string
  socialLinks: SocialLink[]
}

export const personalInfo: PersonalInfo = {
  name: "Samyak Kakatur",
  title: "Full Stack Developer",
  description:
    "Building digital experiences with modern technologies. Focused on creating elegant solutions to complex problems.",
  email: "hello@example.com",
  profileImage: "/placeholder-user.jpg", // Optional: remove or set to undefined to hide profile image
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com",
      icon: "Github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      icon: "Linkedin",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com",
      icon: "Twitter",
    },
  ],
}

export const navigation = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]
