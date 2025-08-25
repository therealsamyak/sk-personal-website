import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { ProjectsSection } from "@/components/ProjectsSection"

const ProjectsPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1">
      <ProjectsSection />
    </main>
    <Footer />
  </div>
)

export default ProjectsPage
