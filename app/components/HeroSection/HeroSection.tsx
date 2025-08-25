import { Linkedin } from "lucide-react"
import Image from "next/image"
import { Link } from "next-view-transitions"
import { siGithub, siX } from "simple-icons"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/config/site"

export const HeroSection = () => (
  <section className="w-full">
    <div className="mx-auto w-full max-w-7xl px-4 pt-24 pb-6 sm:px-6 md:pt-32 md:pb-12 lg:px-6 xl:px-4 2xl:px-2">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        {personalInfo.profileImage && (
          <div 
            className="relative h-32 w-32 overflow-hidden rounded-full md:h-48 md:w-48 flex-shrink-0"
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
        <div className="space-y-4">
          <h1 
            className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center"
            style={{ viewTransitionName: "profile-name" }}
          >
            {personalInfo.name}
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            {personalInfo.description}
          </p>
        </div>
        <div 
          className="flex items-center justify-center gap-4 flex-shrink-0"
          style={{ viewTransitionName: "social-links" }}
        >
          {personalInfo.socialLinks.map((social) => (
            <Link key={social.platform} href={social.url} target="_blank">
              <Button variant="outline" size="icon">
                {social.icon === "siGithub" && (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <title>GitHub</title>
                    <path d={siGithub.path} />
                  </svg>
                )}
                {social.icon === "siLinkedin" && <Linkedin className="h-4 w-4" />}
                {social.icon === "siX" && (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <title>X (Twitter)</title>
                    <path d={siX.path} />
                  </svg>
                )}
                <span className="sr-only">{social.platform}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
)
