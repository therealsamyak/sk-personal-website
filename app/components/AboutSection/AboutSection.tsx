import { Linkedin } from "lucide-react"
import Image from "next/image"
import { Link } from "next-view-transitions"
import { siGithub, siX } from "simple-icons"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/config/site"

export const AboutSection = () => (
  <div>
    <h2 className="mb-12 text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
      About Me
    </h2>
    <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
      {personalInfo.profileImage && (
        <div 
          className="relative h-24 w-24 overflow-hidden rounded-full md:h-32 md:w-32 flex-shrink-0"
          style={{ viewTransitionName: "profile-image" }}
        >
          <Image
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="space-y-3">
        <h3 
          className="font-semibold text-xl tracking-tight sm:text-2xl text-center"
          style={{ viewTransitionName: "profile-name" }}
        >
          {personalInfo.name}
        </h3>
        <p className="mx-auto max-w-[600px] text-gray-500 text-sm md:text-base dark:text-gray-400">
          {personalInfo.description}
        </p>
      </div>
      <div 
        className="flex items-center justify-center gap-3 flex-shrink-0"
        style={{ viewTransitionName: "social-links" }}
      >
        {personalInfo.socialLinks.map((social) => (
          <Link key={social.platform} href={social.url} target="_blank">
            <Button variant="outline" size="sm">
              {social.icon === "siGithub" && (
                <svg className="h-3 w-3 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <title>GitHub</title>
                  <path d={siGithub.path} />
                </svg>
              )}
              {social.icon === "siLinkedin" && <Linkedin className="h-3 w-3 sm:mr-2" />}
              {social.icon === "siX" && (
                <svg className="h-3 w-3 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <title>X (Twitter)</title>
                  <path d={siX.path} />
                </svg>
              )}
              <span className="hidden sm:inline">{social.platform}</span>
              <span className="sr-only">{social.platform}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  </div>
)
