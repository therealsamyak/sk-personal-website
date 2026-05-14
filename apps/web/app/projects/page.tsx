import type { Metadata } from "next"

import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Projects | Sevak Kaktur",
  description: "A showcase of my projects and open-source contributions.",
}
import { Header } from "@/components/Header"
import { ProjectsSection } from "@/components/ProjectsSection"

const ProjectsPage = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="flex-1">
      <ProjectsSection />
    </main>
    <Footer />
  </div>
)

export default ProjectsPage
