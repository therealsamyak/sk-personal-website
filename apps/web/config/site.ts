interface SocialLink {
  platform: string
  url: string
  icon?: string
}

interface PersonalInfo {
  name: string
  title: string
  profileImage?: string
  resumeUrl?: string
  icon?: string
  socialLinks: SocialLink[]
}

export const personalInfo: PersonalInfo = {
  name: "Samyak Kakatur",
  title: "Software Engineer & IoT Specialist",
  profileImage: "/pfp.jpeg",
  resumeUrl: "https://tinyurl.com/samyak-kakatur-resume", // Optional: set your resume URL here
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
      platform: "X (Twitter)",
      url: "https://x.com/skakatur_dev",
      icon: "siX",
    },
  ],
}

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]
