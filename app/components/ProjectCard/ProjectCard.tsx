"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { siGithub } from "simple-icons"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import type { Project } from "@/config/projects"
import { getColorClasses, getTechColor } from "@/config/tech-stack"

interface ProjectCardProps extends Project {}

export const ProjectCard = ({ title, description, image, link, tags }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="flex h-[32rem] w-full flex-col overflow-hidden sm:w-80 lg:w-96">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="relative aspect-video cursor-pointer">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </DialogTrigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80" />
          <p className="-translate-x-1/2 fixed top-4 left-1/2 z-50 transform rounded-md bg-black/60 px-3 py-1 font-bold text-base text-white backdrop-blur-sm">
            Click outside to close
          </p>
          <DialogPrimitive.Content className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in">
            <div className="relative aspect-video w-full rounded-lg border-4 border-border">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </Dialog>
      <div className="flex flex-1 flex-col">
        <CardContent className="flex-1 p-4 pb-1">
          <h3 className="mb-2 text-center font-semibold text-xl">{title}</h3>
          <p className="mb-3 text-muted-foreground text-sm">{description}</p>
          <div className="flex max-h-[6rem] flex-wrap justify-center gap-2">
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
}
