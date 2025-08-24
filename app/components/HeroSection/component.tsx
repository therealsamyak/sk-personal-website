import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/config/site"

export const HeroSection = () => (
  <section id="about" className="w-full">
    <div className="mx-auto w-full max-w-7xl px-4 pt-24 pb-6 sm:px-6 md:pt-48 md:pb-12 lg:px-6 xl:px-4 2xl:px-2">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        {personalInfo.profileImage && (
          <div className="relative h-32 w-32 overflow-hidden rounded-full">
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
          <h1 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            {personalInfo.title}
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            {personalInfo.description}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          {personalInfo.socialLinks.map((social) => (
            <Link key={social.platform} href={social.url} target="_blank">
              <Button variant="outline" size="icon">
                {social.icon === "Github" && <Github className="h-4 w-4" />}
                {social.icon === "Linkedin" && <Linkedin className="h-4 w-4" />}
                {social.icon === "Twitter" && <Twitter className="h-4 w-4" />}
                <span className="sr-only">{social.platform}</span>
              </Button>
            </Link>
          ))}
          <Link href={`mailto:${personalInfo.email}`}>
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
)
