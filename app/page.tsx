import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">SK</span>
            </Link>
            <nav className="hidden items-center space-x-6 font-medium text-sm md:flex">
              <Link
                href="#about"
                className="rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                About
              </Link>
              <Link
                href="#projects"
                className="rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline">Resume</Button>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="px-4 pt-24 pb-6 md:px-6 md:pt-48 md:pb-12">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Full Stack Developer
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Building digital experiences with modern technologies. Focused on creating elegant
                  solutions to complex problems.
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Link href="https://github.com" target="_blank">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://linkedin.com" target="_blank">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://twitter.com" target="_blank">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
                <Link href="mailto:hello@example.com">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="px-4 py-12 md:px-6 md:py-24">
          <div className="container">
            <h2 className="mb-12 text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
              Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="E-commerce Platform"
                description="A full-stack e-commerce platform built with Next.js, Prisma, and Stripe integration."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com"
                tags={["Next.js", "Prisma", "Stripe"]}
              />
              <ProjectCard
                title="Task Management App"
                description="A real-time task management application with team collaboration features."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com"
                tags={["React", "Node.js", "Socket.io"]}
              />
              <ProjectCard
                title="AI Chat Interface"
                description="An AI-powered chat interface with natural language processing capabilities."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com"
                tags={["OpenAI", "Next.js", "TailwindCSS"]}
              />
              <ProjectCard
                title="Weather Dashboard"
                description="A responsive weather dashboard with location-based forecasts and interactive maps."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com"
                tags={["Vue.js", "Weather API", "Chart.js"]}
              />
              <ProjectCard
                title="Social Media Analytics"
                description="A comprehensive analytics platform for tracking social media performance and engagement."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com"
                tags={["Python", "Django", "PostgreSQL"]}
              />
              <ProjectCard
                title="Cryptocurrency Tracker"
                description="Real-time cryptocurrency portfolio tracker with price alerts and market analysis."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com"
                tags={["React Native", "Redux", "CoinGecko API"]}
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:px-6 md:py-24">
          <div className="container">
            <h2 className="mb-12 text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
              Tech Stack
            </h2>
            <TechStack />
          </div>
        </section>

        <section id="contact" className="px-4 py-12 md:px-6 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-12 text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
                Get in Touch
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="flex items-center justify-center px-4 py-6 md:px-6">
          <p className="text-gray-500 text-xs dark:text-gray-400">
            © 2024 John.dev. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
