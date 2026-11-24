"use client"

import { X } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import Image from "next/image"
import Link from "next/link"
import { siGithub } from "simple-icons"
import type { Project } from "@/config/projects"
import { getColorClasses, getTechColor } from "@/config/tech-stack"
import { Button } from "@/ui/button"
import { Card, CardContent, CardFooter } from "@/ui/card"
import { Dialog, DialogTitle, DialogTrigger } from "@/ui/dialog"

interface ProjectCardProps extends Project {
  loading?: "lazy" | "eager"
}

export const ProjectCard = ({
  title,
  description,
  image,
  link,
  tags,
  loading,
}: ProjectCardProps) => {
  return (
    <Card className="min-h-136 w-full max-w-96 sm:w-80 lg:w-96">
      <Dialog>
        <DialogTrigger asChild>
          <button
            aria-label={`View full-size preview of ${title}`}
            className="relative aspect-video w-full cursor-pointer overflow-hidden border-0 bg-transparent p-0"
            type="button"
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
              loading={loading}
              className="object-cover transition-transform hover:scale-105"
            />
          </button>
        </DialogTrigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80" />
          <DialogPrimitive.Content className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col gap-2 overflow-y-auto rounded-lg border bg-background p-3 transition-opacity duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in">
            <div className="flex items-center justify-between gap-2">
              <DialogTitle className="leading-normal">{title}</DialogTitle>
              <Button variant="ghost" size="icon" className="size-10" asChild>
                <DialogPrimitive.Close aria-label="Close preview">
                  <X />
                </DialogPrimitive.Close>
              </Button>
            </div>
            <DialogPrimitive.Description className="sr-only">
              Full-size preview image for {title}.
            </DialogPrimitive.Description>
            <div className="relative aspect-video max-h-[calc(100dvh-6rem)] w-full shrink-0 rounded-md bg-muted">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                loading={loading}
                className="rounded-md"
                style={{ objectFit: "contain" }}
              />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </Dialog>
      <div className="flex flex-1 flex-col">
        <CardContent className="flex-1 p-4 pb-1">
          <h3 className="mb-2 text-center font-semibold text-xl">{title}</h3>
          <p className="mb-3 text-center text-muted-foreground text-sm">{description}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {tags.slice(0, 12).map((tag) => (
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
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
              <title>GitHub</title>
              <path d={siGithub.path} />
            </svg>
            View on GitHub
          </Link>
        </CardFooter>
      </div>
    </Card>
  )
}
