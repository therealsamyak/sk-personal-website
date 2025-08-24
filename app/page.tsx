import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { TechStackSection } from "@/components/TechStackSection"

const Page = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <HeroSection />
      <ProjectsSection />
      <TechStackSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
)

export default Page
