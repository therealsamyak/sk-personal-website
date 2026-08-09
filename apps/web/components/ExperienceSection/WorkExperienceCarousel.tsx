"use client"

import { Pause, Play } from "lucide-react"
import { useEffect, useState } from "react"

const AUTO_ADVANCE_MS = 15_000

type WorkExperience = {
  readonly company: string
  readonly division?: string
  readonly title: string
  readonly dates: string
  readonly highlights: readonly string[]
}

type CarouselState = {
  readonly activeIndex: number
  readonly previousIndex: number | null
  readonly direction: "forward" | "backward"
}

const workExperiences = [
  {
    company: "US Department of the Treasury",
    division: "Departmental Offices, Treasury Common Services Center (TCSC)",
    title: "AI Engineer",
    dates: "June 2026 - Present",
    highlights: ["Working on a variety of technical projects and modernization efforts."],
  },
  {
    company: "Sidecar Health",
    title: "Software Engineer Intern",
    dates: "July - Sept. 2025 | July - Sept. 2024",
    highlights: [
      "Created a containerized audit automation app in NextJS, speeding up Audit timeline from ~1 week -> ~48 hours.",
      "Utilized AWS ECS, RDS, SDM, Amplify to deploy production applications and container services.",
      "Overhauled authentication framework with WorkOS AuthKit.",
      "Triaged and fixed multiple high-priority bugs in record-time.",
    ],
  },
] as const satisfies readonly WorkExperience[]

const getPositionClasses = (index: number, carousel: CarouselState) => {
  if (index === carousel.activeIndex) {
    return "translate-y-0 opacity-100"
  }

  if (index === carousel.previousIndex) {
    return carousel.direction === "forward"
      ? "-translate-y-full opacity-0"
      : "translate-y-full opacity-0"
  }

  return carousel.direction === "forward"
    ? "translate-y-full opacity-0"
    : "-translate-y-full opacity-0"
}

export const WorkExperienceCarousel = () => {
  const [carousel, setCarousel] = useState<CarouselState>({
    activeIndex: 0,
    previousIndex: null,
    direction: "forward",
  })
  const [isPaused, setIsPaused] = useState(false)
  const [isInteractionPaused, setIsInteractionPaused] = useState(false)
  const [rotationResetCount, setRotationResetCount] = useState(0)
  const isRotationPaused = isPaused || isInteractionPaused

  useEffect(() => {
    if (isRotationPaused) {
      return
    }

    const intervalId = window.setInterval(() => {
      setCarousel((currentCarousel) => ({
        activeIndex: (currentCarousel.activeIndex + 1) % workExperiences.length,
        previousIndex: currentCarousel.activeIndex,
        direction: "forward",
      }))
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(intervalId)
  }, [isRotationPaused, rotationResetCount])

  return (
    <section
      aria-label="Work experience"
      aria-roledescription="carousel"
      className="flex min-w-0 items-stretch gap-3"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsInteractionPaused(false)
        }
      }}
      onFocusCapture={() => {
        setIsInteractionPaused(true)
      }}
      onPointerEnter={() => {
        setIsInteractionPaused(true)
      }}
      onPointerLeave={() => {
        setIsInteractionPaused(false)
      }}
    >
      <div
        aria-live={isPaused ? "polite" : "off"}
        className="relative min-h-[17.5rem] min-w-0 flex-1 overflow-hidden"
        id="work-experience-carousel"
      >
        {workExperiences.map((experience, index) => (
          <article
            aria-hidden={index !== carousel.activeIndex}
            aria-label={`Work experience ${index + 1} of ${workExperiences.length}: ${experience.company}`}
            className={`absolute inset-0 flex flex-col rounded-lg border p-4 transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${getPositionClasses(index, carousel)}`}
            key={experience.company}
          >
            <div className="flex flex-col gap-2">
              <h5 className="font-medium">{experience.company}</h5>
              {experience.division ? (
                <p className="text-zinc-500 text-sm">{experience.division}</p>
              ) : null}
              <p className="text-zinc-600 text-sm dark:text-zinc-400">{experience.title}</p>
              <p className="text-zinc-500 text-sm">{experience.dates}</p>
            </div>
            <ul className="mt-3 flex-1 list-inside list-disc flex flex-col gap-1 text-zinc-600 text-sm dark:text-zinc-400">
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div
        aria-label="Work experience controls"
        className="flex w-7 shrink-0 flex-col items-center justify-center gap-2"
      >
        {workExperiences.map((experience, index) => (
          <button
            aria-controls="work-experience-carousel"
            aria-current={index === carousel.activeIndex ? "true" : undefined}
            aria-label={`Show ${experience.company}`}
            className={`flex size-6 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              index === carousel.activeIndex
                ? "text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            key={experience.company}
            onClick={() => {
              setRotationResetCount((currentResetCount) => currentResetCount + 1)
              setCarousel((currentCarousel) => {
                if (currentCarousel.activeIndex === index) {
                  return currentCarousel
                }

                return {
                  activeIndex: index,
                  previousIndex: currentCarousel.activeIndex,
                  direction: index > currentCarousel.activeIndex ? "forward" : "backward",
                }
              })
            }}
            type="button"
          >
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${
                index === carousel.activeIndex ? "bg-current" : "bg-current/40"
              }`}
            />
          </button>
        ))}
        <button
          aria-label={
            isPaused
              ? "Resume automatic work experience rotation"
              : "Pause automatic work experience rotation"
          }
          className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => {
            setIsPaused((currentIsPaused) => !currentIsPaused)
          }}
          type="button"
        >
          {isPaused ? (
            <Play aria-hidden="true" size={14} />
          ) : (
            <Pause aria-hidden="true" size={14} />
          )}
        </button>
      </div>
    </section>
  )
}
