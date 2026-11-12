import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Samyak Kakatur",
  description: "A showcase of my projects and open-source contributions.",
}
import { ProjectsSection } from "@/components/ProjectsSection"

const ProjectsPage = () => <ProjectsSection />

export default ProjectsPage
