import { Linkedin } from "lucide-react"
import Image from "next/image"
import { Link } from "next-view-transitions"
import { siGithub, siX } from "simple-icons"
import { personalInfo } from "@/config/site"
import { Button } from "@/ui/button"

export const AboutSection = () => (
  <div>
    <div className="mb-12 flex flex-col items-center justify-center gap-6 text-center">
      {personalInfo.profileImage && (
        <div
          className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full"
          style={{ viewTransitionName: "profile-image" }}
        >
          <Image
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            fill
            className="object-cover"
            priority
            quality={95}
            sizes="256px"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 px-4">
        <h3
          className="text-center font-semibold text-3xl tracking-tight sm:text-5xl"
          style={{ viewTransitionName: "profile-name" }}
        >
          {personalInfo.name}
        </h3>
        <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base dark:text-gray-400">
          {personalInfo.description}
        </p>
      </div>
      <div
        className="flex shrink-0 items-center justify-center gap-3"
        style={{ viewTransitionName: "social-links" }}
      >
        {personalInfo.socialLinks.map((social) => (
          <Link key={social.platform} href={social.url} target="_blank">
            <Button
              variant="outline"
              size="lg"
              className="duolingo-button -translate-y-[4px] transform-gpu shadow-[0px_4px_var(--button-shadow)] transition-all duration-100 ease-out hover:bg-primary/90 active:translate-y-0 active:animate-duolingoButtonPress active:shadow-[0px_0px_var(--button-shadow)]"
            >
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
