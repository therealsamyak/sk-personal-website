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
    "Full-Stack & Embedded Software Engineer. Masters of Engineering - IoT Systems @ UCLA. Passionate about software and business. ",
  email: "therealsamyak@gmail.com",
  profileImage: "/pfp.jpeg",
  resumeUrl:
    "https://1drv.ms/b/c/c23dc39496b5c117/EeizFMoT2nxPrreTp6eybycB-to7okCv1yDw4zXnpVFTZQ?e=lWRPmM", // Optional: set your resume URL here
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
