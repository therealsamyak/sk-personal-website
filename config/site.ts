export interface SocialLink {
  platform: string
  url: string
  icon?: string
}

export interface PersonalInfo {
  name: string
  title: string
  description: string
  email?: string
  profileImage?: string
  resumeUrl?: string
  icon?: string
  socialLinks: SocialLink[]
}

export const personalInfo: PersonalInfo = {
  name: "Samyak Kakatur",
  title: "Software Engineer & IoT Specialist",
  description:
    "Full-Stack & Embedded Software Engineer. Masters of Engineering - IoT Systems @ UCLA. Passionate about software and business. ",
  email: "therealsamyak@gmail.com",
  profileImage: "/pfp.jpeg",
  resumeUrl:
    "https://1drv.ms/b/c/c23dc39496b5c117/ES6K1VrUmuJHomTu_MGzvnQBU1H6JPDESeEQbvQFBmEVjw?e=h02gHt", // Optional: set your resume URL here
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
