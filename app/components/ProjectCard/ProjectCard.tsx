import { Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Project } from "@/config/projects"

interface ProjectCardProps extends Project {}

export const ProjectCard = ({ title, description, image, link, tags }: ProjectCardProps) => (
  <Card className="overflow-hidden">
    <div className="relative aspect-video">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform hover:scale-105"
      />
    </div>
    <CardContent className="p-4">
      <h3 className="mb-2 font-semibold text-xl">{title}</h3>
      <p className="mb-4 text-muted-foreground text-sm">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-md bg-muted px-2 py-1 font-medium text-xs ring-1 ring-gray-500/10 ring-inset"
          >
            {tag}
          </span>
        ))}
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Link
        href={link}
        target="_blank"
        className="inline-flex items-center gap-2 text-sm hover:underline"
      >
        <Github className="h-4 w-4" />
        View on GitHub
      </Link>
    </CardFooter>
  </Card>
)
