import Image from "next/image"
import Link from "next/link"
import { ViewTransition } from "react"
import { siGithub, siX } from "simple-icons"
import { LinkedInIcon } from "@/components/icons/LinkedInIcon"
import { personalInfo } from "@/config/site"
import { Button } from "@/ui/button"

import { Description } from "./Description"

export const AboutSection = () => (
  <div>
    <div className="mb-12 flex flex-col items-center justify-center gap-6 text-center">
      {personalInfo.profileImage && (
        <ViewTransition name="profile-image" default="none" share="auto">
          <div
            className="relative size-64 shrink-0 overflow-hidden rounded-full"
            style={{ contain: "layout size" }}
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
        </ViewTransition>
      )}
      <div className="flex flex-col gap-4 px-4">
        <ViewTransition name="profile-name" default="none" share="auto">
          <h1
            className="text-center font-semibold text-3xl tracking-tight sm:text-5xl"
            style={{ contain: "layout" }}
          >
            {personalInfo.name}
          </h1>
        </ViewTransition>
        <Description />
      </div>
      <ViewTransition name="social-links" default="none" share="auto">
        <div
          className="flex shrink-0 items-center justify-center gap-3"
          style={{ contain: "layout" }}
        >
          {personalInfo.socialLinks.map((social) => (
            <Button
              asChild
              key={social.platform}
              variant="outline"
              size="lg"
              className="duolingo-button -translate-y-[4px] transform-gpu shadow-[0px_4px_var(--button-shadow)] transition-[translate,transform,background-color,color,box-shadow,border-color] duration-100 ease-out hover:bg-primary/90 active:translate-y-0 active:animate-duolingoButtonPress active:shadow-[0px_0px_var(--button-shadow)]"
            >
              <Link href={social.url} target="_blank" rel="noopener noreferrer">
                {social.icon === "siGithub" && (
                  <svg className="size-3 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <title>GitHub</title>
                    <path d={siGithub.path} />
                  </svg>
                )}
                {social.icon === "siLinkedin" && <LinkedInIcon className="size-3 sm:mr-2" />}
                {social.icon === "siX" && (
                  <svg className="size-3 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <title>X (Twitter)</title>
                    <path d={siX.path} />
                  </svg>
                )}
                <span className="hidden sm:inline">{social.platform}</span>
                <span className="sr-only">{social.platform}</span>
              </Link>
            </Button>
          ))}
        </div>
      </ViewTransition>
    </div>
  </div>
)
