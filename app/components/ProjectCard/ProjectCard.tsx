import Image from "next/image"
import Link from "next/link"
import { siGithub } from "simple-icons"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Project } from "@/config/projects"
import { getColorClasses, getTechColor } from "@/config/tech-stack"

interface ProjectCardProps extends Project {}

export const ProjectCard = ({ title, description, image, link, tags }: ProjectCardProps) => (
  <Card className="flex h-[30rem] w-full flex-col overflow-hidden sm:w-80 lg:w-96">
    <div className="relative aspect-video">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform hover:scale-105"
      />
    </div>
    <div className="flex flex-1 flex-col">
      <CardContent className="flex-1 p-4 pb-1">
        <h3 className="mb-2 text-center font-semibold text-xl">{title}</h3>
        <p className="mb-4 text-muted-foreground text-sm">{description}</p>
        <div className="flex max-h-20 flex-wrap justify-center gap-2 overflow-hidden">
          {tags.slice(0, 8).map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center rounded-md px-2 py-1 font-medium text-sm ring-1 ring-inset ${getColorClasses(getTechColor(tag))}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <div className="mx-4 border-border border-t" />
      <CardFooter className="flex justify-center p-4">
        <Link
          href={link}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm hover:underline"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <title>GitHub</title>
            <path d={siGithub.path} />
          </svg>
          View on GitHub
        </Link>
      </CardFooter>
    </div>
  </Card>
)
