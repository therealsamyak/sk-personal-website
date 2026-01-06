import { ProjectCard } from "../ProjectCard"
import { projects } from "../../config/projects"

export const ProjectsSection = () => (
  <section className="w-full pt-6 pb-12 md:pt-8 md:pb-24">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-6 xl:px-4 2xl:px-2">
      <h2 className="mb-12 text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
        Projects
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={`${project.title}-${index}`} {...project} />
        ))}
      </div>
    </div>
  </section>
)
